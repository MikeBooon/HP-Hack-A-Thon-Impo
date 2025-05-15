<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Imposition } from '$lib/server/service/imposition-service';
	import { untrack } from 'svelte';

	let { data } = $props();

	let selectedImposition: Imposition | undefined = $state(undefined);

	let alteredImposition: Imposition | undefined = $state(undefined);

	let stringifiedImposition = $derived(JSON.stringify(alteredImposition, null, 4));

	$effect(() => {
		if (selectedImposition) {
			untrack(() => {
				alteredImposition = structuredClone(selectedImposition);
			});
		}
	});

	let slotsX = $state(0);
	let slotsY = $state(0);

	let inputWidth = $state(0);
	let inputHeight = $state(0);
	let inputGutters = $state(0);

	function generateSlots() {
		if (!selectedImposition) {
			return;
		}

		const sheetHeight = selectedImposition.sheet.height;
		const sheetWidth = selectedImposition.sheet.width;

		const spaceWidth =
			sheetWidth - (selectedImposition.sheet.margin.left + selectedImposition.sheet.margin.right);
		const spaceHeight =
			sheetHeight - (selectedImposition.sheet.margin.top + selectedImposition.sheet.margin.bottom);

		const slotWidth = inputWidth + inputGutters;

		const slotHeight = inputHeight + inputGutters;

		const horSlotsX = Math.floor(spaceWidth / slotWidth);
		const horSlotsY = Math.floor(spaceHeight / slotHeight);

		const horSlotsAvailable = slotsX * slotsY;

		const verSlotsX = Math.floor(spaceWidth / slotHeight);
		const verSlotsY = Math.floor(spaceHeight / slotWidth);

		const verSlotsAvailable = slotsX * slotsY;

		if (horSlotsAvailable > verSlotsAvailable) {
			slotsX = horSlotsX;
			slotsY = horSlotsY;
		} else {
			slotsX = verSlotsX;
			slotsY = verSlotsY;
		}
	}
</script>

<main class="m-10">
	<h1 class="text-xl font-bold">Create Imposition</h1>
	<form class="flex flex-col" use:enhance method="POST">
		<select bind:value={selectedImposition} class="select">
			{#each data.impositions as imposition}
				<option value={imposition}>{imposition.name}</option>
			{/each}
		</select>
		<h2>Selected Template: {selectedImposition?.name}</h2>

		<label for="width">Print Width</label>
		<input type="number" bind:value={inputWidth} id="width" class="input" />

		<label for="height">Print Height</label>
		<input type="number" bind:value={inputHeight} id="height" class="input" />

		<label for="gutters">Gutters</label>
		<input type="number" bind:value={inputGutters} id="gutters" class="input" />

		<div>Width: {selectedImposition?.sheet.width}</div>
		<div>Width: {selectedImposition?.sheet.height}</div>

		<button onclick={generateSlots} type="button" class="btn btn-ghost">Generate Slots</button>

		<div>Slots X: {slotsX}</div>
		<div>Slots Y: {slotsY}</div>

		<input class="block" name="data" bind:value={stringifiedImposition} />

		<button type="submit" class="btn btn-primary">Create</button>
	</form>
</main>
