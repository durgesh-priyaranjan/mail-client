document.querySelector("body").addEventListener("click", function(e) {
  // DOM event Bindings
  var target = e.target;

  if (e.target.dataset && e.target.dataset.event) {
    // Trigger function
    var eventDetail = e.target.dataset.event.split(",");
    var objectMethodMap = eventDetail[0].split("-");
    var mClientObject = objectMethodMap[0];
    var mClientObjectMethod = objectMethodMap[1];

    if (mClientObject && mClientObjectMethod) {
      mClient[mClientObject][mClientObjectMethod].apply(
        window,
        eventDetail.slice(1)
      );
    }
  }
});
