module.exports = function (plop) {
    plop.setGenerator('Page', {
        description: 'Create a pug template of page and styles for it',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Page name (kebab-case)',
            },
            {
                type: 'input',
                name: 'title',
                message: 'Page title',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pug/pages/{{name}}/index.pug',
                templateFile: '.plop/page-template.hbs',
            },
            {
                type: 'add',
                path: 'src/styles/{{name}}.scss',
            },
        ],
    });
    plop.setGenerator('Component', {
        description: 'Create a pug template of component and styles for it',
        prompts: [
            {
                type: 'input',
                name: 'title',
                message: 'Component title (kebab-case)',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pug/components/{{title}}.pug',
                templateFile: '.plop/component-template.hbs',
            },
            {
                type: 'add',
                path: 'src/styles/components/_{{title}}.scss',
            },
        ],
    });
};
