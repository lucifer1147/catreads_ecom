<script>
    export let book;
    import {goto} from "$app/navigation";
</script>

<div class="w-72 h-[480px] bg-red-200 rounded-2xl p-5 hover:bg-red-400 transition-all" onclick={()=>{goto('/books/' + book.id)}} role="button">
    <div class="bg-yellow-200 w-full h-2/3 rounded-t-lg border-orange-700 border-b-2 overflow-clip flex items-center">
        <img src={book.PhotoString} alt={book.Name + ' book cover'} class="w-full">
    </div>

    <div class="bg-red-100 h-1/3 w-full rounded-b-lg border-orange-700 border-t-2 font-bold flex items-center justify-center text-lg p-5">
        Name: {book['Name']} <br>
        Author: {book['Author']} <br>
        Genre: {book ['Genre']}
    </div>
</div>