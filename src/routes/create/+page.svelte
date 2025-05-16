<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Imposition, ImpositionSlot } from '$lib/server/service/imposition-service';
	import { untrack } from 'svelte';

	let { data } = $props();

	let selectedImposition: Imposition | undefined = $state(undefined);
	let alteredImposition: Imposition | undefined = $state(undefined);

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

		alterImposition();
	}

	function alterImposition() {
		if (!selectedImposition || !alteredImposition) {
			return;
		}

		const frontSlots: ImpositionSlot[] = [];

		let index = 0;
		let x = selectedImposition.sheet.margin.left + inputGutters;
		for (const slotX of Array(slotsX).keys()) {
			let y = selectedImposition.sheet.margin.top + inputGutters;
			for (const slotY of Array(slotsY).keys()) {
				frontSlots.push({
					left: x,
					top: y,
					index: index,
					width: inputWidth,
					height: inputHeight,
					number: index * 2 - 1,
					ref: '0-' + index,
					rotation: 0,
					placement: 'CC',
					scaleX: 100,
					scaleY: 100,
					bindingMargin: 'N',
					bleed: {
						top: inputGutters / 2,
						right: inputGutters / 2,
						bottom: inputGutters / 2,
						left: inputGutters / 2
					},
					marks: {
						centerTop: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftCenter: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightCenter: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						centerBottom: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftTop: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightTop: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightBottom: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftBottom: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						}
					},
					offset: {
						left: 0,
						top: 0,
						right: 0,
						bottom: 0
					}
				});
				y += inputHeight + inputGutters;
				index++;
			}
			x += inputWidth + inputGutters;
		}

		x =
			selectedImposition.sheet.width -
			selectedImposition.sheet.margin.left -
			selectedImposition.sheet.margin.right -
			inputWidth -
			inputGutters;

		const backSlots: ImpositionSlot[] = [];
		index = 0;

		for (const slotX of Array(slotsX).keys()) {
			let y = selectedImposition.sheet.margin.top + inputGutters;
			for (const slotY of Array(slotsY).keys()) {
				backSlots.push({
					left: x,
					top: y,
					index: index,
					width: inputWidth,
					height: inputHeight,
					number: index * 2,
					ref: '1-' + index,
					rotation: 0,
					placement: 'CC',
					scaleX: 100,
					scaleY: 100,
					bindingMargin: 'N',
					bleed: {
						top: inputGutters / 2,
						right: inputGutters / 2,
						bottom: inputGutters / 2,
						left: inputGutters / 2
					},
					marks: {
						centerTop: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftCenter: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightCenter: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						centerBottom: {
							type: 'none',
							length: 0,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftTop: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightTop: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						rightBottom: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						},
						leftBottom: {
							type: 'VH',
							length: 0.197,
							offset: 0.118,
							style: 'solid',
							colour: 'black',
							adjustX: 0,
							adjustY: 0
						}
					},
					offset: {
						left: 0,
						top: 0,
						right: 0,
						bottom: 0
					}
				});
				y += inputHeight + inputGutters;
				index++;
			}
			x -= inputWidth + inputGutters;
		}

		alteredImposition.sheet.rows = slotsY;
		alteredImposition.sheet.cols = slotsX;
		alteredImposition.sheet.gutter = {
			horizontal: inputGutters,
			vertical: inputGutters
		};
		alteredImposition.sides[0].gutters = {
			horizontal: [inputGutters],
			vertical: [inputGutters]
		};

		alteredImposition.sides[1].gutters = {
			horizontal: [inputGutters],
			vertical: [inputGutters]
		};

		alteredImposition.sides[0].slots = frontSlots;
		alteredImposition.sides[1].slots = backSlots;
	}
</script>

<main class="m-10">
	<div class="card bg-base-200 p-5 shadow-xl">
		<h1 class="card-title">Create Imposition</h1>
		<form class="card-body flex flex-col" use:enhance method="POST">
			<label for="imposition">Imposition</label>
			<select id="imposition" bind:value={selectedImposition} class="select w-full">
				{#each data.impositions as imposition}
					<option value={imposition}>{imposition.name}</option>
				{/each}
			</select>

			{#if selectedImposition}
				<label for="width">Print Width</label>
				<input
					type="number"
					onchange={alterImposition}
					bind:value={inputWidth}
					id="width"
					class="input w-full"
				/>

				<label for="height">Print Height</label>
				<input
					type="number"
					onchange={alterImposition}
					bind:value={inputHeight}
					id="height"
					class="input w-full"
				/>

				<label for="gutters">Gutters</label>
				<input
					type="number"
					min="0"
					step="0.01"
					onchange={alterImposition}
					bind:value={inputGutters}
					id="gutters"
					class="input w-full"
				/>

				<div>Width: {selectedImposition?.sheet.width}</div>
				<div>Width: {selectedImposition?.sheet.height}</div>

				<button onclick={generateSlots} type="button" class="btn btn-accent">Generate Slots</button>

				<div>Slots X: {slotsX}</div>
				<div>Slots Y: {slotsY}</div>

				<input class="hidden" name="data" value={JSON.stringify(alteredImposition)} />

				<button type="submit" class="btn btn-primary">Create</button>
			{/if}
		</form>
	</div>
</main>
