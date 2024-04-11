class Part {
    /**
    * @param {number} max_grade
    * @param {number} max_test
    * @param {number} max_sim_one
    * @param {number} max_sim_two
    * @param {number} max_work
    * @param {Subject[]} subjects
    */
    constructor(max_grade, max_test, max_sim_one, max_sim_two, max_work, subjects) {
        this.max_grade = max_grade;
        this.max_test = max_test;
        this.max_sim_one = max_sim_one;
        this.max_sim_two = max_sim_two;
        this.max_work = max_work;
        this.subjects = subjects;
    }
}

class Subject {
    /**
    * @param {string} name
    */
    constructor(name) {
        this.name = name;
        this.test = 0;
        this.sim_one = 0;
        this.sim_two = 0;
        this.work = 0;
    }
}

export {Part, Subject}
