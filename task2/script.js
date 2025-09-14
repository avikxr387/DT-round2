fetch("https://dev.deepthought.education/assets/uploads/files/others/ddugky_project.json")
  .then(response => response.json())
  .then(data => {
    renderTask(data.tasks[0]); // render first task
  });

function createAsset(asset) {
  let container = document.createElement("div");
  container.classList.add("asset");

  let title = document.createElement("h3");
  title.textContent = asset.asset_title;

  let desc = document.createElement("p");
  desc.textContent = asset.asset_description;

  container.appendChild(title);
  container.appendChild(desc);

  if (asset.asset_content_type === "video") {
    let iframe = document.createElement("iframe");
    iframe.src = asset.asset_content.trim();
    iframe.width = "560";
    iframe.height = "315";
    container.appendChild(iframe);
  } else if (asset.asset_content_type === "article") {
    let link = document.createElement("a");
    link.href = asset.asset_content.trim();
    link.textContent = "Read More";
    link.target = "_blank";
    container.appendChild(link);
  } else if (asset.asset_content_type === "threadbuilder") {
    let textarea = document.createElement("textarea");
    textarea.placeholder = "Write your threads here...";
    container.appendChild(textarea);
  }

  return container;
}

function renderTask(task) {
  let taskContainer = document.getElementById("task");

  let title = document.createElement("h2");
  title.textContent = task.task_title;

  let desc = document.createElement("p");
  desc.textContent = task.task_description;

  taskContainer.appendChild(title);
  taskContainer.appendChild(desc);

  task.assets.forEach(asset => {
    let assetElement = createAsset(asset);
    taskContainer.appendChild(assetElement);
  });
}
