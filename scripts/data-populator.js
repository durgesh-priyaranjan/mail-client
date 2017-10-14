// Contains config for application and
// Mock data to be used in application
// Also used as store schema

var mClient = mClient || {};

defaultData = {
  // App Config
  placeholders: {
    defaultView: "folder-holder",
    mailListView: "mail-list-holder",
    emailDetailView: "email-detail-holder"
  },

  selectedFilter: "all",
  filteredData: [],

  defaultRoute: "#/inbox",
  selectors: {
    defaultDetailView: ".default-detail-view",
    emailDetailView: ".mail-view"
  },

  deletedFolderKey: "deleted",
  folders: {
    inbox: "Inbox",
    spam: "Spam",
    custom: "Custom",
    deleted: "Deleted"
  },

  // Mock Data
  inbox: [
    {
      mId: "guid-1",
      read: true,
      subject: "Training Program",
      content:
        "About Microsoft Virtual Academy<br/>Microsoft Virtual Academy provides free online training by world-class experts to help you build your technical skills and advance your career. Make it your destination of choice to get started on the latest Microsoft technologies and join this vibrant community."
    },
    {
      mId: "guid-2",
      read: false,
      subject: "Empower your future",
      content:
        "We foster our pipeline of future leaders with 47 employee networks and 7 global employee resource groups, servicing an active community of thousands across Microsoft"
    }
  ],
  spam: [
    {
      mId: "guid-3",
      read: true,
      subject: "Pre Approved Loan",
      content:
        "Congratulations ! <u>Credit card</u> is being shipped to you today!"
    },
    {
      mId: "guid-4",
      read: true,
      subject: "You won a lottery!",
      content:
        "You have just won the New York official lottery. Please send us your address so that we may start the transfer."
    }
  ],
  custom: [
    {
      mId: "guid-5",
      read: true,
      subject: "Custom 1",
      content:
        "Congratulations ! <u>Credit card</u> is being shipped to you today!"
    },
    {
      mId: "guid-6",
      read: true,
      subject: "Custom 2",
      content:
        "You have just won the New York official lottery. Please send us your address so that we may start the transfer."
    }
  ],
  deleted: [
    {
      mId: "guid-7",
      read: true,
      subject: "Deleted 1",
      content:
        "Congratulations ! <u>Credit card</u> is being shipped to you today!"
    },
    {
      mId: "guid-8",
      read: true,
      subject: "Deleted 2",
      content:
        "You have just won the New York official lottery. Please send us your address so that we may start the transfer."
    }
  ]
};

// Persist in local storage
if (!localStorage.mClientData) {
  localStorage.setItem("mClientData", JSON.stringify(defaultData));
}
mClient.data = JSON.parse(localStorage.getItem("mClientData"));
mClient.update = function(data, triggerUpdate) {
  localStorage.setItem("mClientData", JSON.stringify(data));

  if (triggerUpdate) {
    mClient.handlers.navigator();
  }
};
