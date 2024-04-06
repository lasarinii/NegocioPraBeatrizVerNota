<script>
    import '../app.css'

    class Subject {
        /**
         * @param {string} name
         */
        constructor(name) {
            this.name = name
            this.sim_a = 0
            this.sim_b = 0
            this.test = 0
            this.work = 0
            this.media = 0
        }

        calcMedia() {
            this.media = (this.sim_a + this.sim_b + this.test + this.work) / 4
            return this.media
        }
    }
    
    /**
    * @type {string[]}
    */
    let subject_names = ['Artes', 'Biologia', 'Educação Física', 'Filosofia', 'Física', 'Geografia', 'História', 'Inglês', 'Literatura', 'Matemática', 'Português', 'Produção de Texto', 'Química', 'Sociologia']

    /**
    * @type {Subject[]}
    */
    let subjects = []
    for (let i = 0; i < subject_names.length; i++) {
        subjects.push(new Subject(subject_names[i]))
    }
    /**
    * @type {string[]}
    */
    let selected_subjects = subject_names

    /**
    * @param {string} subject
    */
    function toggle(subject) {
        if (selected_subjects.includes(subject)) {
            selected_subjects = selected_subjects.filter(m => m !== subject)
        } else {
            selected_subjects = [...selected_subjects, subject]
        }
    }

    function toggleAll(evt) {
        if (evt.target.checked) {
            selected_subjects = [...subject_names]
        } else {
            selected_subjects = []
        }
    }
</script>

<svelte:head>
    <title>NegocioPraBeatrizVerNota</title>
</svelte:head>

<div class="w-full max-h-screen overflow-y-scroll flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold">Negócio Pra Beatriz Ver Nota</h1>
    <div class="container">
        <select class="select select-bordered w-full max-w-xs">
            <option>Etapa 1</option>
            <option>Etapa 2</option>
            <option>Etapa 3</option>
        </select>
        <div class="grid grid-cols-5 place-items-start p-3">
            {#each subjects as subject}
            <label class="cursor-pointer label">
                <input type="checkbox" checked={selected_subjects.includes(subject.name)} on:change={() => toggle(subject.name)} class="checkbox mx-3" />
                <span class="label-text">{subject.name}</span>
            </label>
            {/each}
            <label class="cursor-pointer label">
                <input type="checkbox" checked={subjects.length === selected_subjects.length} on:change={toggleAll} class="checkbox mx-3" />
                <span class="label-text">Todas</span>
            </label>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra">
                <thead>
                    <tr>
                        <th>Matéria</th>
                        <th>Sim. A</th>
                        <th>Sim. B</th>
                        <th>Prova</th>
                        <th>Trabalho</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {#each subjects as subject}
                    {#if selected_subjects.findIndex(m => m === subject.name) != -1}
                    <tr>
                        <td>{subject.name}</td>
                        <td><input bind:value={subject.sim_a} on:change={() => subject.calcMedia()} type="number" class="{subject}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.sim_b} on:change={() => subject.calcMedia()} type="number" class="{subject}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.test} on:change={() => subject.calcMedia()} type="number" class="{subject}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.work} on:change={() => subject.calcMedia()} type="number" class="{subject}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td>{subject.calcMedia()}</td>
                    </tr>
                    {/if}
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
