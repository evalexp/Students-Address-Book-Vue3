const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const crypto = require("crypto");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  data: [],
}).write();

/**
 *
 * @param {Object} formData
 */
function updateByCode(formData) {
  let queryItem = getDataByFilter({ code: formData.code });
  if (queryItem.length == 0) {
    return "error_code";
  } else {
    db.get("data")
      .find({ code: formData.code })
      .assign(formData)
      .write();
    return "successful";
  }
}

/**
 * Get all the data
 */
function getAllData() {
  return db.get("data").value();
}

/**
 * @param {int} delete_id the id of item which need delete
 */
function removeDataByCode(code) {
  db.get("data")
    .remove({
      code: code,
    })
    .write();
}

/**
 * @param {Object} filter filter match
 */
function getDataByFilter(filter) {
  return db
    .get("data")
    .filter(filter)
    .value();
}

function studentExist(code) {
  return getDataByFilter({ code: code }).length != 0;
}

/**
 * @param {Obejct} data the data of the object need to insert
 */
function insertData(data) {
  if (
    getDataByFilter({
      code: data.code,
    }).length != 0
  ) {
    return "error_code";
  }
  db.get("data")
    .push(data)
    .write();
  return "successful";
}

function getAllDataFromFile(file) {
  const bak_adapter = new FileSync(file);
  try {
    const bak_db = low(bak_adapter);
    return bak_db.get("data").value();
  } catch (error) {
    return [];
  }
}

exports.getAllData = getAllData;
exports.removeDataByCode = removeDataByCode;
exports.getDataByFilter = getDataByFilter;
exports.insertData = insertData;
exports.getAllDataFromFile = getAllDataFromFile;
exports.updateByCode = updateByCode;
exports.studentExist = studentExist;
