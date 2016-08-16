var student=require('./student');
var teacher=require('./teacher');
function add(teacherName,students){
	teacher.add(teacherName);
	students.forEach(function(it,id){
		student.add(it);
	});
}
exports.add=add;
