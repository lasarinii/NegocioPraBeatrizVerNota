import { Part, Subject } from './models.js'

/**
* @param {Part[]} parts
*/
function Save(parts) {
    let serialized_parts = JSON.stringify(parts)
    localStorage.setItem('parts', serialized_parts)
}

/**
* @returns {{parts: Part[], selected_part: number, subject_names: string[], selected_subjects: string[]}}
*/
function Load() {
    let subject_names = ['Artes', 'Biologia', 'Educação Física', 'Filosofia', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura', 'Matemática', 'Português', 'Produção de Texto', 'Química', 'Sociologia']
    let selected_subjects = subject_names
    let selected_part = 0

    let stored_parts_json = localStorage.getItem('parts')
    if (stored_parts_json != null) {
        let stored_parts_parsed = JSON.parse(stored_parts_json)
        let parts = stored_parts_parsed
        return {parts, selected_part, subject_names, selected_subjects}
    }

    /**
    * @type {Subject[]}
    */
    let subjects = []

    /**
    * @type {Part[]}
    */
    let parts = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < subject_names.length; j++) {
            subjects.push(new Subject(subject_names[j]))
        }
        if (i == 0) {
            parts.push(new Part(30, 9, 9, 9, 3, subjects))
            subjects = []
            continue
        }
        parts.push(new Part(35, 10, 10, 10, 5, subjects))
        subjects = []
    }
    return {parts, selected_part, subject_names, selected_subjects}
}

export {Save, Load}
