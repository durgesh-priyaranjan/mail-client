var mClient = mClient || {};

mClient.defaultView = function(folder, emailId) {
  folder = folder || "inbox";

  var folderData = mClient.data.folders[folder];

  if (!folder) {
    alert("Error Occured: Could not resolve folder");
  }

  if (!folderData) {
    alert(
      "Error Occured: Could not fetch data for provided folder name, please check. Redirecting to default"
    );

    location.href = mClient.data.defaultRoute;
  }

  // Generate Folder List Markup
  var folderMarkup = "";
  Object.keys(mClient.data.folders).forEach(function(key) {
    var classes = "";
    if (folder === key) {
      classes = "selected";
    }
      // TODO: Move this to template if time permits
    folderMarkup +=
      "<li><a class='" +
      classes +
      "' href='#/" +
      key +
      "'>" +
      mClient.data.folders[key] +
      "</a></li>";
  });

  // Generate Email List Markup
  var emailListMarkup = "";
  mClient.data[folder].forEach(function(mail) {

      var classes = " ";

    if(mail.mId === emailId){
      classes += "current-active";
    }

    if(!mail.read && mail.mId !== emailId){
      classes += " unread-mail";
    }

    // TODO: Move this to template if time permits
    emailListMarkup +=
      '<a href="#/' +
      folder +
      "/" +
      mail.mId +
      '"><div class="item-view'+classes+' ">' +
      '   <div class="item-title trim">' +
      mail.subject +
      "</div>" +
      '   <div class="item-peek trim">' +
      mail.content +
      "</div>" +
      "</div></a>";
  });

  // DOM Updates
  document.getElementById(
    mClient.data.placeholders.defaultView
  ).innerHTML = folderMarkup;

  document.getElementById(
    mClient.data.placeholders.mailListView
  ).innerHTML = emailListMarkup;

  document.querySelector(
    mClient.data.selectors.defaultDetailView
  ).style.display =
    "block";
  document.querySelector(mClient.data.selectors.emailDetailView).style.display =
    "none";
};
