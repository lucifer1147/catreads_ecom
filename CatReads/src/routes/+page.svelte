<script>
    import left_img from '$lib/images/Left_Hero_Main_Page.jpg'
    import BookCard from "../components/BookCard.svelte";

    import {getBooks} from "../stores/collectionStore.js";
    let books = getBooks()
</script>

<div class="w-[99.5vw] h-[200vh] bg-orange-50">
    <div class="fixed h-[50vh] w-full"
         style="background-image: url('{left_img}'); background-repeat: no-repeat; background-size: 100% "></div>
    <div class="absolute h-[50vh] w-full bg-gradient-to-b from-orange-200/0 to-orange-200"></div>

    {#key books}
        <div class="absolute w-full bg-orange-200 translate-y-[50vh] z-20 flex flex-wrap items-center justify-center gap-x-5 gap-y-5">
            {#await books}
                <p class="h-[50vh]"></p>
            {:then books}
                {#each books as book}
                    <BookCard book={book}/>
                {/each}
            {/await}
        </div>
    {/key}
</div>

