#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>

#include "NewsTable.h"

std::vector<std::filesystem::path> paths = { "news/" }; // hold all found folders
std::vector<std::string> files; // holds all found files

void readFiles() {
	try {
    std::filesystem::path path = paths[paths.size() - 1];
		for (const auto& entry : std::filesystem::directory_iterator(path))
		{
			paths.push_back(entry.path());
			readFiles();
		}
	}
	catch (...) {
		// if can't open. assumes it's a file
		files.push_back(paths[paths.size() - 1].u8string());

		// format string
		const int i = files.size() - 1;
		size_t place = files[i].find("\\");

		while (place != std::wstring::npos) {
			place = files[i].find("\\");

			if (place != std::wstring::npos)
				files[i].replace(place, 1, "/");
		}
	}
}

int main()
{
	readFiles();

	std::ofstream out("MySQL.txt");

  // creates database with charset utf8mb4_general_ci
  out << "CREATE DATABASE presaia_db CHARACTER SET utf8mb4 "
    "COLLATE utf8mb4_general_ci;" << std::endl;

  // opens database
  out << "USE presaia_db;" << std::endl << std::endl;

  // creates news table
  out << NewsTable::createTableSyntax() << std::endl << std::endl;

  // prints inserts for all news elements
  std::vector<std::string> errorCodes;
	for (auto& it : files) {
    NewsTable element;
    auto response = element.generateFromPath(it);

    if (response == NewsTable::RESPONSE::SUCCESS) {
      if (!element.quoteMarkFound()) { // quote marks are not allowed
        out << element;
      }
      else {
        errorCodes.push_back("ERROR CARACTER(') NEVALID IN:" + it + "\n SE POATE INLOCUI CU `");
      }
    }
    else if (response != NewsTable::RESPONSE::IGNORE) {
      // ERROR CODES!!!
      std::string errorCode;

      if (response == NewsTable::RESPONSE::ERR_CAT) {
        errorCode += "ERROR CATEGORIE: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_DESC) {
        errorCode = "ERROR DESCRIERE: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_HREF) {
        errorCode = "ERROR ADRESA FISIER: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_LANG) {
        errorCode = "ERROR LIMBA: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_NAME) {
        errorCode = "ERROR NUME GAZETA: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_NUM) {
        errorCode = "ERROR NUMAR ZIAR: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_PAGE) {
        errorCode = "ERROR NUMAR PAGINI: ";
      }
      else if (response == NewsTable::RESPONSE::ERR_PUBDAT) {
        errorCode = "ERROR DATA PUBLICATII: ";
      }

      errorCode += it;
      errorCodes.push_back(errorCode);
    }
	}

  // PRINT OUT ERROR CODES
  out << std::endl;
  for (auto& it : errorCodes) {
    out << it << std::endl;
  }

	return 0;
}
