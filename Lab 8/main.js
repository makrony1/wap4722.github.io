const student = {
    firstName:"",
    lastName:"",
    grads:[],
    inputNewGrade: function (g) {
        this.grads.push(g);
    },
    computeAverageGrade: function(){
        let total = this.grads.reduce((cur, pre)=> cur+pre,0);
        return total/this.grads.length;
    }
}
 let stu1 = Object.create(student);
 stu1.firstName="Amit";
 stu1.lastName = "Ghosh";
 stu1.inputNewGrade(98);
 stu1.inputNewGrade(99);
 stu1.inputNewGrade(100);

 let stu2 = Object.create(student);
 stu2.firstName="Shudisshan";
 stu2.lastName = "Surendhar";
 stu2.inputNewGrade(91);
 stu2.inputNewGrade(92);
 stu2.inputNewGrade(93);

let students =[];
students.push(stu1);
students.push(stu2);

let avg = (students.reduce((c,p)=>c + p.computeAverageGrade(),0))/students.length;


console.log(`Average grade: ${avg}`);




function Student(fname,lname) {
    this.firstName = fname;
    this.lastName =lname;
    this.grads =[];
}

Student.prototype.inputNewGrade = function (g) {
    this.grads.push(g);
};

Student.prototype.computeAverageGrade = function(){
    let total = this.grads.reduce((cur, pre)=> cur+pre,0);
    return total/this.grads.length;
};


let stu3 = new Student("Amit","Ghosh");
stu3.inputNewGrade(98);
stu3.inputNewGrade(99);
stu3.inputNewGrade(100);

let stu4 = new Student("Suddisshan","Surendhar");
stu4.inputNewGrade(98);
stu4.inputNewGrade(99);
stu4.inputNewGrade(100);

let students2=[stu3, stu4];
let avg2 = (students2.reduce((c,p)=>c + p.computeAverageGrade(),0))/students2.length;
console.log(`Average grade: ${avg2}`);

