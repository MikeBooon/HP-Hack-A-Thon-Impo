<script lang="ts">
	let { data } = $props();

	let selectedImposition = $state<string | undefined>();
</script>

<main class="m-10">
	<h1 class="text-xl font-bold">Impositions</h1>

	<a class="btn btn-accent" href="/create">Create Imposition</a>

	{#if selectedImposition}
		<code class="whitespace-pre">
			{JSON.stringify(
				data.impositions.find((imposition) => imposition._id === selectedImposition),
				null,
				4
			)}
		</code>
	{/if}

	<table class="table">
		<thead>
			<tr>
				<th>Imposition ID</th>
				<th>Imposition Name</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.impositions as imposition}
				<tr>
					<td>{imposition._id}</td>
					<td>{imposition.name}</td>
					<td>
						<button onclick={() => (selectedImposition = imposition._id)} class="btn btn-primary">
							Details
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
