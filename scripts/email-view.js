var mClient = mClient || {};

mClient.emailView = function(folder, emailId) {
  if (!emailId) {
    document.querySelector(
      mClient.data.selectors.defaultDetailView
    ).style.display =
      "block";
    document.querySelector(
      mClient.data.selectors.emailDetailView
    ).style.display =
      "none";
    return;
  }

  var emailData = mClient.data[folder].find(function(email) {
    return email.mId === emailId;
  });

  if (!emailData) {
    alert("Error Occured: Could not find email for specified folder and id");
  }

  // Generate Email Markup

  var deleteMarkUp = "";
  if (folder !== mClient.data.deletedFolderKey) {
    deleteMarkUp =
      '| <span data-event="modifiers-delete, ' +
      folder +
      "," +
      emailData.mId +
      ' "> Delete </span>';
  }

  var flagMarkUp =
    '<span data-event="modifiers-markFlagged, ' +
    folder +
    "," +
    emailData.mId +
    ' ">Mark as Flagged</span>';

  if (emailData.flag === true) {
    flagMarkUp =
      '<span data-event="modifiers-markUnFlagged, ' +
      folder +
      "," +
      emailData.mId +
      ' ">Un-Flag</span>';
  }

  // TODO: Move this to template if time permits
  var mailMarkup =
    '<div class="email-actions">' +
    flagMarkUp +
    deleteMarkUp +
    '</div><div class="mail-view-subject">' +
    emailData.subject +
    "</div>" +
    '<div class="mail-view-content">' +
    emailData.content +
    "</div>";

  // DOM Updates
  document.getElementById(
    mClient.data.placeholders.emailDetailView
  ).innerHTML = mailMarkup;

  document.querySelector(
    mClient.data.selectors.defaultDetailView
  ).style.display =
    "none";
  document.querySelector(mClient.data.selectors.emailDetailView).style.display =
    "block";
};
