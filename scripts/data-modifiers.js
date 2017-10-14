// Methods to Update/Modify Data

var mClient = mClient || {};

mClient.modifiers = {
  filter: function(type) {
    var selectedFolder = mClient.handlers.getFolder();
    mClient.data.selectedFilter = type;

    mClient.data.filteredData = mClient.data[selectedFolder].filter(function(
      mail
    ) {
      if (type === "all") {
        return true;
      } else if (type === "flagged" && mail.flag === true) {
        return true;
      } else if (type === "unflagged" && !mail.flag) {
        return true;
      }

      return false;
    });

    mClient.update(mClient.data, false);
    mClient.handlers.defaultView(selectedFolder);
  },

  getParams: function(folder, emailId) {
    if (!folder || !emailId) {
      alert("Error: can not delete. Not enough parameters");
      return;
    }

    folder = folder.trim();
    emailId = emailId.trim();

    return {
      folder: folder,
      emailId: emailId
    };
  },

  updateMail: function(folder, emailId, property, value) {
    var params = mClient.modifiers.getParams(folder, emailId);
    var mail = mClient.data[params.folder].find(function(email) {
      return email.mId === params.emailId;
    });

    mail[property] = value;
    mClient.update(mClient.data, false);
  },

  markAsRead: function(folder, emailId) {
    mClient.modifiers.updateMail(folder, emailId, "read", true);
  },

  markFlagged: function(folder, emailId) {
    mClient.modifiers.updateMail(folder, emailId, "flag", true);
    mClient.handlers.navigator();
  },

  markUnFlagged: function(folder, emailId) {
    mClient.modifiers.updateMail(folder, emailId, "flag", false);
    mClient.handlers.navigator();
  },

  delete: function(folder, emailId) {
    var params = mClient.modifiers.getParams(folder, emailId);

    if (params.folder === mClient.data.deletedFolderKey) return;

    mClient.data[params.folder] = mClient.data[params.folder].filter(function(
      mail
    ) {
      if (mail.mId !== params.emailId) {
        return true;
      } else {
        mClient.data[mClient.data.deletedFolderKey].push(mail);
        return false;
      }
    });

    mClient.update(mClient.data, false);
    location.href = mClient.data.defaultRoute;
  }
};
