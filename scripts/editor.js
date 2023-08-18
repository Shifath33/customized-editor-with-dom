// get the text from text editor
// let editorTextElement = document.getElementById("editor");
// editorTextElement.addEventListener("keyup", function () {
//     let editorText = editorTextElement.value;
//     console.log(editorText);
// });

let useSelectedText = false;

// let fontSizeInputElement = document.getElementById("font-size-input");
// button.style.fontSize = fontSizeInputElement.value + "px";
// console.log(button.style.fontSize);

const textStyleClasses = {
    bold: {
        id: "bold",
        className: "font-bold"
    },
    italic: {
        id: "italic",
        className: "italic"
    },
    underline: {
        id: "underline",
        className: "underline"
    },
    strikeThrough: {
        id: "strikethrough",
        className: "line-through"
    },
    alignLeft: {
        id: "align-left",
        className: "text-left"
    },
    alignCenter: {
        id: "align-center",
        className: "text-center"
    },
    alignRight: {
        id: "align-right",
        className: "text-right"
    },
    alignJustify: {
        id: "align-justify",
        className: "text-justify"
    },
    uppercase: {
        id: "uppercase",
        className: "uppercase"
    }
}

const textAlignmentClasses = ["text-left", "text-center", "text-right", "text-justify"];

function toggleClass(className) {
    let editorTextElement = document.getElementById("editor");
    if (textAlignmentClasses.includes(className)) {
        textAlignmentClasses.forEach(function (textAlignmentClass) {
            editorTextElement.classList.remove(textAlignmentClass);
        });
        editorTextElement.classList.add(className);
    }
    else if (editorTextElement.classList.contains(className)) {
        editorTextElement.classList.remove(className);
    }
    else {
        editorTextElement.classList.add(className);
    }
    editorTextElement.focus();
}

for (let textStyleClass in textStyleClasses) {
    let textStyle = textStyleClasses[textStyleClass];
    document.getElementById(textStyle.id).addEventListener("click", function () {

        if (useSelectedText) {
            changeSelectedTextFromTextArea(textStyle.className);
        }
        else {
            toggleClass(textStyle.className);
        }
    });
}

const eventList = ["change", "keyup"]
for (let event of eventList) {
    document.getElementById("font-size-input").addEventListener(event, function () {
        let fontSizeInputElement = document.getElementById("font-size-input");
        let fontSize = fontSizeInputElement.value;
        if (fontSize < 1) {
            alert("font size can't be less than 1px. Setting font size to 1px.");
            fontSizeInputElement.value = 1;
            fontSize = fontSizeInputElement.value;
        }
        if (fontSize > 99) {
            alert("font size can't be greater than 99px. Setting font size to 99px.");
            fontSizeInputElement.value = 99;
            fontSize = fontSizeInputElement.value;
        }
        let editorTextElement = document.getElementById("editor");
        editorTextElement.style.fontSize = fontSize + "px";
    });
}

document.getElementById("color-picker").addEventListener("change", function () {
    let editorTextElement = document.getElementById("editor");
    editorTextElement.style.color = this.value;
    editorTextElement.focus();
});

const selectedTextButton = document.getElementById("selected-text-button");
selectedTextButton.addEventListener("click", function () {
    if (useSelectedText) {
        useSelectedText = false;
        selectedTextButton.innerText = "Use Selected Text";
    }
    else {
        useSelectedText = true;
        selectedTextButton.innerText = "Use All Text";
    }
});

const previewContainer = document.getElementById("preview-container");
const editorPreviewElement = document.getElementById("editor-preview");
const editorContainer = document.getElementById("editor-container");
const editorTextElement = document.getElementById("editor");
const previewButton = document.getElementById("preview-button");

previewButton.addEventListener("click", function () {
    editorPreviewElement.classList = [];
    console.log(previewContainer.classList);
    if (previewContainer.classList.contains("hidden")) {
        previewContainer.classList.remove("hidden");
        editorContainer.classList.add("hidden");
        previewButton.innerText = "Edit";
        if (!useSelectedText) {
            editorPreviewElement.classList = editorTextElement.classList;
            editorPreviewElement.style.fontSize = editorTextElement.style.fontSize;
            editorPreviewElement.style.color = editorTextElement.style.color;
        }
        editorPreviewElement.innerHTML = editorTextElement.value;
    }
    else {
        previewContainer.classList.add("hidden");
        editorContainer.classList.remove("hidden");
        previewButton.innerText = "Preview";
    }
});

// selected text style from editor
function changeSelectedTextFromTextArea(className) {
    let textarea = document.getElementById("editor");

    let len = textarea.value.length;
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    let selectedText = textarea.value.substring(start, end);
    let editorText = textarea.value;

    // This is the selected text and alert it
    console.log(selectedText, selectedText.length, editorText, editorText.indexOf(selectedText));
    if (selectedText.length > 0 && editorText.indexOf(selectedText) !== -1) {
        let replacedText = `<span class="${className}">${selectedText}</span>`;
        // Here we are replacing the selected text with this one
        let textareaValue = `${editorText.substring(0, start)} ${replacedText} ${editorText.substring(end, len)}`;
        textarea.value = textareaValue;
        console.log(textareaValue);
    }
    else {
        toggleClass(className);
    }
}