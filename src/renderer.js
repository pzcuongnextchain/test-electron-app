var config = {
  settings: {
    showCloseIcon: false,
  },
  content: [
    {
      type: "row",
      content: [
        {
          type: "component",
          componentName: "textComponent",
          componentState: { text: "Component 1111" },
          isClosable: false,
        },
        {
          type: "component",
          componentName: "urlComponent",
          componentState: {
            url: "https://golden-layout.com/docs/BrowserWindow.html",
          },
          isClosable: false,
        },
        {
          type: "component",
          componentName: "htmlFileComponent",
          componentState: { filePath: "./secondary.html" },
        },
      ],
    },
  ],
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent("textComponent", function (container, state) {
  container.getElement().html("<h2>" + state.text + "</h2>");
});

myLayout.registerComponent("urlComponent", function (container, state) {
  container
    .getElement()
    .html('<iframe src="' + state.url + '" title="Sample" ></iframe>');
});

myLayout.registerComponent("htmlFileComponent", function (container, state) {
  $.get(state.filePath, function (data) {
    container.getElement().html(data);
  });
});

myLayout.on("tabCreated", function (tab) {
  tab.closeElement.off("click").click(function () {
    if (
      confirm(
        "You have unsaved changes, are you sure you want to close this tab"
      )
    )
      tab.contentItem.remove();
  });
  tab.contentItem.on("popout", function () {
    confirm("Are you sure you want to popout this window?");
    var popoutWindow = popout.getGlInstance().browserWindow;
    popoutWindow.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "Are you sure you want to close this window?";
    });
  });
});

myLayout.init();
