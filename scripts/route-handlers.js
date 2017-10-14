var mClient = mClient || {};

mClient.handlers = {
  // Show Folder
  // By default, select 1st folder and show its email list
  // Show default-detail-view
  // Hide mail-view
  defaultView: mClient.defaultView,

  // Default view
  // folder view
  // Hide default-detail-view
  // Show mail-view
  emailView: mClient.emailView,

  getFolder: function() {
    var url = location.hash.slice(1) || "/",
      params = url.split("/").filter(function(param) {
        return param.length;
      });
    return params[0];
  },

  navigator: function() {
    var url = location.hash.slice(1) || "/",
      params = url.split("/").filter(function(param) {
        return param.length;
      }),
      folder = params[0],
      emailId = params[1];

    mClient.data.selectedFilter = "all";

    if (!folder && !emailId) {
      mClient.handlers.defaultView();
    }

    if (folder) {
      mClient.handlers.defaultView(folder, emailId);
    }

    if (emailId) {
      mClient.handlers.emailView(folder, emailId);
      mClient.modifiers.markAsRead(folder, emailId);
    }
  }
};

window.addEventListener("hashchange", mClient.handlers.navigator);
window.addEventListener("load", mClient.handlers.navigator);
