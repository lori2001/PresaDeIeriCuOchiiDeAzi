#include "NewsTable.h"

NewsTable::RESPONSE NewsTable::generateFromPath(const std::string path)
{
  // --- href ---------------------
  try {
    _href = "../../../assets/doc/" + path;
  }
  catch (...) {
    return RESPONSE::ERR_HREF;
  }
  // ------------------------------

  auto tmp = path;
  size_t start = 0;
  size_t end = 0;

  // --- name --------------------
  try {
    start = tmp.find_first_of('/');
    end = tmp.find_first_of(';');
    tmp.replace(start, 1, "<");
    tmp.replace(end, 1, "<");

    start++;
    _name = tmp.substr(start, end - start);
  }
  catch (...) {
    return RESPONSE::ERR_NAME;
  }
  // ------------------------------

  // --- category -----------------
  try {
    start = end;
    end = tmp.find_first_of(';');
    tmp.replace(end, 1, "<");

    start++;
    _category = tmp.substr(start, end - start);
  }
  catch (...) {
    return RESPONSE::ERR_CAT;
  }
  // ------------------------------

  // --- language -----------------
  try {
    start = end;
    end = tmp.find_first_of('/');
    tmp.replace(end, 1, "<");

    start++;
    _language = tmp.substr(start, end - start);
  }
  catch (...) {
    return RESPONSE::ERR_LANG;
  }
  // ------------------------------

  try {
    start = path.find_last_of('/');
    end = path.find_last_of('.'); // eliminates extension
    start++;
    tmp = path.substr(start, end - start);

    if (tmp == "antet") {
      return RESPONSE::IGNORE;
    }
  }
  catch (...) {
    return RESPONSE::ERR_HREF;
  }

  // --- number -------------------
  try {
    start = 0;
    end = tmp.find_first_of(';');
    tmp.replace(end, 1, "<");

    _num = std::stoi(tmp.substr(start, end - start));
  }
  catch (...) {
    return RESPONSE::ERR_NUM;
  }
  // ------------------------------

  // --- publish_date ------------
  try {
    start = end + 1;
    end = tmp.find_first_of(';');
    tmp.replace(end, 1, "<");

    _publish_date = tmp.substr(start, end - start);

    auto st = _publish_date.find_first_of('.');
    _publish_date.replace(st, 1, "-");
    st++;

    auto ed = _publish_date.find_first_of('.');
    _publish_date.replace(ed, 1, "-");
    ed++;

    if (std::stoi(_publish_date.substr(st, 2)) == 0) {
      _publish_date.replace(st + 1, 1, "1");

      _noMonth = "true";
    }

    if (std::stoi(_publish_date.substr(ed, 2)) == 0) {
      _publish_date.replace(ed + 1, 1, "1");

      _noDay = "true";
    }
  }
  catch (...) {
    return RESPONSE::ERR_PUBDAT;
  }
  // ------------------------------

  // --- page ---------------------
  try {
    start = end + 1;
    end = tmp.find_first_of(';');
    tmp.replace(end, 1, "<");

    _page = std::stoi(tmp.substr(start, end - start));
  }
  catch (...) {
    return RESPONSE::ERR_PAGE;
  }
  // ------------------------------

  // --- description --------------
  try {
    start = end + 1;
    end = tmp.size() - start;

    _description = tmp.substr(start, end);
  }
  catch (...) {
    return RESPONSE::ERR_DESC;
  }
  // ------------------------------

  return RESPONSE::SUCCESS;
}

bool NewsTable::quoteMarkFound()
{
  /* ' is unallowed */
  auto found = _href.find("'");
  if (found != std::string::npos)
    return true;

  found = _name.find("'");
  if (found != std::string::npos)
    return true;

  found = _description.find("'");
  if (found != std::string::npos)
    return true;

  found = _keywords.find("'");
  if (found != std::string::npos)
    return true;
  /*--------------------*/

  return false;
}

std::string NewsTable::createTableSyntax()
{
  return std::string(
    "CREATE TABLE IF NOT EXISTS news("
    "	id int NOT NULL AUTO_INCREMENT,"
    "	name varchar(255),"
    "	href varchar(255),"
    "	description varchar(255),"
    "	category varchar(255),"
    "	language varchar(255),"
    "	noDay BOOLEAN,"
    "	noMonth BOOLEAN,"
    "	page int,"
    "	num int,"
    "	publish_date DATE,"
    "	keywords varchar(255),"
    "	PRIMARY KEY(id)"
    ");");
}

std::ostream& operator<<(std::ostream& out, const NewsTable& c)
{
  out << "INSERT INTO `news`(`name`, `href`, "
    "`description`, `category`, `language`, `noDay`, `noMonth`, `page`, `num`, "
    "`publish_date`, `keywords`) VALUES ";

  out << "("
    "'" << c.getName()        << "',"
    "'" << c.getHref()        << "',"
    "'" << c.getDescription() << "',"
    "'" << c.getCategory()    << "',"
    "'" << c.getLanguage()    << "',"
        << c.getNoDay()       << " ,"
        << c.getNoMonth()     << " ,"
        << c.getPage()        << " ,"
        << c.getNum()         << " ,"
    "'" << c.getPublishDate() << "',"
    "'" << c.getKeywords()    << "' " << ");\n";

  return out;
}
