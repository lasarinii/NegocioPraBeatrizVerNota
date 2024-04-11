<script>
    import '../app.css'
    import { onMount } from 'svelte';
    import { Subject, Part } from '$lib/models.js'
    import { Save, Load } from '$lib/state.js'

    let theme = false
    $: if (theme) {
        document.querySelector('html')?.setAttribute('data-theme', 'light')
    } else {
        document.querySelector('html')?.setAttribute('data-theme', 'dark')
    }

    let {parts, selected_part, subject_names, selected_subjects} = Load()
    onMount(() => {
        let data = Load()
        parts = typeof data.stored_parts == 'undefined' ? data.parts : data.stored_parts
        selected_part = data.selected_part
        subject_names = data.subject_names
        selected_subjects = data.selected_subjects
    })

    /**
    * @param {Subject} subject
    */
    function media(subject) {
        return ((subject.test + subject.sim_one + subject.sim_two + subject.work) / 4).toFixed(2);
    }
    /**
    * @param {Part} part
    * @param {Subject} subject
    */
    function performance(part, subject) {
        let sum = subject.test + subject.sim_one + subject.sim_two + subject.work;
        return ((sum * 100) / part.max_grade).toFixed(2);
    }

    /**
    * @param {string} subject
    */
    function toggle(subject) {
        if (selected_subjects.includes(subject)) {
            selected_subjects = selected_subjects.filter(item => item !== subject)
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

<div class="w-full h-screen flex flex-col items-center justify-start">
    <div class="container overflow-y-auto">
        <h1 class="text-3xl font-bold text-center my-5">Negócio Pra Beatriz Ver Nota</h1>
        <select bind:value={selected_part} class="select select-bordered w-full max-w-xs">
            <option value="1" selected>Etapa 1</option>
            <option value="2">Etapa 2</option>
            <option value="3">Etapa 3</option>
        </select>
        <button on:click={() => Save(parts || [])} class="btn mx-3">Save</button>
        <label class="swap swap-rotate">
            <input type="checkbox" value={theme} on:change={() => theme = !theme} />
            <!-- sun icon -->
            <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            <!-- moon icon -->
            <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>
        {#if selected_part > 0 && parts}
        <div class="grid grid-cols-3 sm:grid-cols-5 place-items-start p-3">
            {#each parts[selected_part - 1].subjects as subject}
            <label class="cursor-pointer label">
                <input type="checkbox" checked={selected_subjects.includes(subject.name)} on:change={() => toggle(subject.name)} class="checkbox mx-3" />
                <span class="label-text">{subject.name}</span>
            </label>
            {/each}
            <label class="cursor-pointer label">
                <input type="checkbox" checked={parts[selected_part - 1].subjects.length === selected_subjects.length} on:change={toggleAll} class="checkbox mx-3" />
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
                    {#each parts[selected_part - 1].subjects as subject}
                    {#if selected_subjects.findIndex(item => item === subject.name) != -1}
                    <tr>
                        <td>{subject.name}</td>
                        <td><input bind:value={subject.sim_one} on:change={() => {if (subject.sim_one > parts[selected_part - 1].max_sim_one || subject.sim_one < 0) subject.sim_one = 0; subject.media()}} type="number" class="{subject.name}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.sim_two} on:change={() => {if (subject.sim_two > parts[selected_part - 1].max_sim_two || subject.sim_two < 0) subject.sim_two = 0; subject.media()}} type="number" class="{subject.name}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.test} on:change={() => {if (subject.test > parts[selected_part - 1].max_test || subject.test < 0) subject.test = 0; subject.media()}} type="number" class="{subject.name}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td><input bind:value={subject.work} on:change={() => {if (subject.work > parts[selected_part - 1].max_work || subject.work < 0) subject.work = 0; subject.media()}} type="number" class="{subject.name}-grade input input-bordered w-[3rem] h-[2rem]"></td>
                        <td>{media(subject)}</td>
                    </tr>
                    {/if}
                    {/each}
                </tbody>
            </table>
            <div class="grid grid-cols-1 place-items-start">
                {#each parts[selected_part - 1].subjects as subject}
                {#if selected_subjects.findIndex(item => item === subject.name) != -1}
                <div class="stats shadow">
                    <div class="stat place-items-center">
                        <div class="stat-value">{subject.name}</div>
                    </div>
  
                    <div class="stat place-items-center">
                        <div class="stat-title">Aproveitamento</div>
                        <div class="radial-progress" style="--value:{performance(parts[selected_part - 1], subject)};" role="progressbar">{performance(parts[selected_part - 1], subject)}</div>
                    </div>
                </div>
                {/if}
                {/each}
            </div>
        </div>
        {/if}
    </div>
</div>
