#pragma once
#include <string>
#include <fstream>

// BEMENETI FILE KRITERIUMOK
// /GazetaTransilvania-bv-ro/ 001-1880.00.00-0-LEIRAS
// /nev(elso folder)-hely-nyelv szam-datum-oldal-leiras

/*
CREATE TABLE IF NOT EXISTS `categories` (
    id INT unsigned AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO `categories` (`id`, `name`) VALUES (NULL, 'bv');
INSERT INTO `categories` (`id`, `name`) VALUES (NULL, 'sb');

CREATE TABLE IF NOT EXISTS `languages` (
    id INT unsigned AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `languages` (`id`, `name`) VALUES (NULL, 'hu');
INSERT INTO `languages` (`id`, `name`) VALUES (NULL, 'ro');
INSERT INTO `languages` (`id`, `name`) VALUES (NULL, 'de');

FOREIGN KEY (language_id) REFERENCES languages(id),
FOREIGN KEY (category_id) REFERENCES categories(id)
*/

class NewsTable {
public:
  enum class RESPONSE {
    SUCCESS = 0,
    IGNORE,
    ERR_NAME,
    ERR_HREF,
    ERR_DESC,
    ERR_CAT,
    ERR_LANG,
    ERR_PAGE,
    ERR_NUM,
    ERR_PUBDAT
  };

  RESPONSE generateFromPath(const std::string path);
  bool quoteMarkFound();

  friend std::ostream& operator << (std::ostream& out, const NewsTable& c);

  static std::string createTableSyntax();

private:
  std::string _href = " ";
  std::string _name = " ";
  std::string _description = " ";
  std::string _keywords = " "; // kulcsszavak
  std::string _category = " "; // bv vagy sb
  std::string _language = " "; // hu, ro, de
  std::string _publish_date = " "; // nn.hh.eeee
  std::string _noDay = "false"; // true or false
  std::string _noMonth = "false"; // true or false
  int _page = 0;
  int _num = 0;

public:
  std::string getHref() const { return _href; }
  std::string getName() const { return _name; }
  std::string getDescription() const { return _description; }
  std::string getCategory() const { return _category; }
  std::string getLanguage() const { return _language; }
  std::string getKeywords() const { return _keywords; }
  std::string getPublishDate() const { return _publish_date; }
  std::string getNoDay() const { return _noDay; }
  std::string getNoMonth() const { return _noMonth; }
  int getPage() const { return _page; }
  int getNum() const { return _num; }
};
