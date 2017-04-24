angular.module('todoApp', [
    'ui.router',
    'todo'
])
.config(function($stateProvider, $urlRouterProvider) {
    var basePath = 'src/app';
    //joe
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: basePath + '/todo/todo.html',
            controller: 'todoController as todoCtrl'
        });
});
angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            $scope.todoCtrl = this;

            // $scope === this
            // make the model availabale to the view
            // @todo: finish implementing the submit function
            // @todo:add an edit function
            // @todo: add a delete function 

            this.todos = model.todos;
            this.submit = function onSubmit() {
                console.log('value is ' + this.newTodo);
                this.todos.push( { text : this.newTodo } );
                this.newTodo = '';
            };

            this.delete = function onDelete(index){
                console.log ("On Delete Function for todo Text " + this.todos[index].text);
                this.todos.splice(index,1);
            }

            this.edit = function onEdit(index){
                console.log ("On Edit Function for todo Text " + this.todos[index].text);
                this.selectedIndex = index;
                this.editTodo = this.todos[index].text;

            }

            this.done = function onDone(index){
                console.log ("On Done Function for todo Text " + this.todos[index].text);
                this.todos[index].text = this.editTodo;
                this.selectedIndex = -1;
            }

    }])

    .service('todoModel', function(){
        //manage todo state
        //@todo: define the model and expose it to the rest of the app
        var todoList = [];
        return {
            todos : todoList
        }
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgdmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAnO1xyXG4gICAgLy9qb2VcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCd0b2RvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy90b2RvL3RvZG8uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuICAgICAgICB9KTtcclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uICgkc2NvcGUsIG1vZGVsKSB7XHJcbiAgICAgICAgICAgICRzY29wZS50b2RvQ3RybCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyAkc2NvcGUgPT09IHRoaXNcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgbW9kZWwgYXZhaWxhYmFsZSB0byB0aGUgdmlld1xyXG4gICAgICAgICAgICAvLyBAdG9kbzogZmluaXNoIGltcGxlbWVudGluZyB0aGUgc3VibWl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOmFkZCBhbiBlZGl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgYSBkZWxldGUgZnVuY3Rpb24gXHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gZnVuY3Rpb24gb25TdWJtaXQoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndmFsdWUgaXMgJyArIHRoaXMubmV3VG9kbyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnB1c2goIHsgdGV4dCA6IHRoaXMubmV3VG9kbyB9ICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RvZG8gPSAnJztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiT24gRGVsZXRlIEZ1bmN0aW9uIGZvciB0b2RvIFRleHQgXCIgKyB0aGlzLnRvZG9zW2luZGV4XS50ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiT24gRWRpdCBGdW5jdGlvbiBmb3IgdG9kbyBUZXh0IFwiICsgdGhpcy50b2Rvc1tpbmRleF0udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFRvZG8gPSB0aGlzLnRvZG9zW2luZGV4XS50ZXh0O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kb25lID0gZnVuY3Rpb24gb25Eb25lKGluZGV4KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcIk9uIERvbmUgRnVuY3Rpb24gZm9yIHRvZG8gVGV4dCBcIiArIHRoaXMudG9kb3NbaW5kZXhdLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvc1tpbmRleF0udGV4dCA9IHRoaXMuZWRpdFRvZG87XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIH1dKVxyXG5cclxuICAgIC5zZXJ2aWNlKCd0b2RvTW9kZWwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vbWFuYWdlIHRvZG8gc3RhdGVcclxuICAgICAgICAvL0B0b2RvOiBkZWZpbmUgdGhlIG1vZGVsIGFuZCBleHBvc2UgaXQgdG8gdGhlIHJlc3Qgb2YgdGhlIGFwcFxyXG4gICAgICAgIHZhciB0b2RvTGlzdCA9IFtdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zIDogdG9kb0xpc3RcclxuICAgICAgICB9XHJcbiAgICB9KTsiXX0=
