## Details about Dynamic Plugin Loading

- To load plugins dynamically code has been added in agents code 
- Test plugins are kept in plugins-test folder
- Changes are done to tsup and tsconfig in resepective plugins folder to bundle it to dist. All code gets bundled to index.js and that is what is needed.
- If you need to test more plugins add more plugins to plugins-test folder build them by chnaging it like tsconfig and tsup like in other folders and thats it. Make sure dist is created. Agent dynamic plugin code will try to scan and find the plugin in plugins-test folder and load it from there on runtime.