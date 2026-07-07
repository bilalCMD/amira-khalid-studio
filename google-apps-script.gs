/*
  SETUP INSTRUCTIONS (Bilal — do this once):

  1. Go to https://sheets.google.com and create a new blank Google Sheet.
     Name it something like "Amira Khalid — Bookings".
  2. In that sheet, in the top toolbar, click Extensions > Apps Script.
  3. Delete anything in the editor and paste this entire file's contents.
  4. Change ADMIN_SECRET below to your own private password (used by the
     admin submissions page to read the data — keep it secret).
  5. Click Deploy > New deployment > select type "Web app".
     - Execute as: Me
     - Who has access: Anyone
     Click Deploy, authorize the permissions it asks for (it's your own
     script, this is safe), then copy the "Web app URL" it gives you —
     it looks like: https://script.google.com/macros/s/XXXXXXX/exec
  6. Paste that URL into assets/app.js, replacing the
     GOOGLE_SHEET_WEBAPP_URL placeholder value.
  7. Every new booking submitted on the site will now append a row to
     this sheet automatically, AND the admin-submissions.html page on
     the site will be able to read them back nicely formatted.

  If you ever change the form fields, update the `headers` array below
  to match, and re-deploy (Deploy > Manage deployments > Edit > New
  version) so the change takes effect.
*/

var ADMIN_SECRET = "REPLACE_WITH_YOUR_OWN_SECRET";

var headers = ["timestamp", "name", "phone", "service", "date", "time", "location", "address", "notes", "paymentStatus"];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  var data = JSON.parse(e.postData.contents);
  var row = headers.map(function(key) {
    if (key === "timestamp") return new Date();
    return data[key] || "";
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var secret = e.parameter.secret || "";
  if (secret !== ADMIN_SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);
  var values = sheet.getDataRange().getValues();
  var rows = values.slice(1).map(function(r) {
    var obj = {};
    headers.forEach(function(key, i) { obj[key] = r[i]; });
    return obj;
  }).reverse(); // newest first

  return ContentService.createTextOutput(JSON.stringify({ ok: true, rows: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}
