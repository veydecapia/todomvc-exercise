

describe('TodoMVC Test', () => {
    
    describe('Go to Todo website', () => {
        
        //Check for fresh state of the website
        it('Should focus on the todo input textbox', () => {
            
        });

        it('Should have no items previously added', () => {
            
        });

        //TODO: Check if possible on Protrator Selenium
        it('Should have zero number of todos in local storage', () => {
            
        });

        it('Should have correct placeholder', () => {
            
        });

        it('Should not display main and footer', () => {
            
        });
        
    });


    describe('Add new todo', () => {
    
        beforeAll(() => {
            //Make sure no items stored in local storage.
            //Clear any previous added items if there are any
        });

        afterAll(() => {
            //Perform cleanup. Clear any added items in the list.
        });

        //TODO: Data driven test, use for each loop to go through todo items
        describe('Label #' + 'Item # here', () => {
           it('Should label contains', () => {
               
           }); 

           it('Should append one item to the botoom of the list', () => {
               
           });

           it('Should have added one todo in local storage', () => {
               
           });

           it('Should the text input field be blank/cleared', () => {
               
           });

           it('Should trim the text input', () => {
               
           });

           it('Should add Todo count', () => {
               
           });

           it('Should dipslay main and footer', () => {
               
           });

           it('Should have correct number of todos in local storage', () => {
               
           });
        });
    });


    /**
     * TODO: Scenario Idea dump
     * Mark all todo items as complete
     * Unmark all todo items as complete
     * Mark todo items as complete
     * Editing
     *          Save editing
     *          Hide controls
     * Main and footer
     *          Display All Active Completed
     * ...
     * */


    
});