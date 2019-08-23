const renderPanel = ({height, width}) => `
<div class='panel'
    data-panel-height='${height}'
    data-panel-width='${width}'>
    <textarea></textarea>
    <button class='remove-button'>X</button>
</div>`;

const addPanel = (node, panel) => {
    node.innerHTML = `${node.innerHTML}${renderPanel(panel)}`;
};

const renderPage = () =>
    `
    <div class='page'>
        <button class='remove-button'>X</button>
        <form class="add-panel-form">
            <label for="add-height">Height</label>
            <input
                name="add-height"
                type="number"
                max="3" min="1" />
            <label for="add-width">Width</label>
            <input
                name="add-width"
                type="number"
                max="3" min="1" />
            <input type="submit" />
        </form>
        <div class="panel-content">

        </div>
    </div>`;


const addPage = (node) => {
    node.innerHTML = `${node.innerHTML}${renderPage()}`;
};


const handleForm = (form) => {
    const formData = new FormData(form);
    const height = formData.get('add-height');
    const width = formData.get('add-width');
    const pageContent = form.parentElement;
    const panelContent = pageContent.querySelector('.panel-content');
    addPanel(panelContent, {height, width});
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('remove-button')) {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
    if (e.target && e.target.id === 'add-page') {
        addPage(e.target.parentElement);
    }
})
document.addEventListener('submit', (e) => {
    if (e.target && e.target.classList.contains('add-panel-form')) {
        e.preventDefault();
        handleForm(e.target);
    }
})
