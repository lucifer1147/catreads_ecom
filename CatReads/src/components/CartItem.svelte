<script>
    import AddToCart from "./AddToCart.svelte";
    export let book
    console.log(book)
</script>

<div class="w-full h-48 rounded-2xl bg-amber-700 text-white my-3 flex p-5">
    <div class="w-1/5 h-full bg-yellow-400 rounded-md"></div>
    <div class="w-3/5 h-full flex items-center px-8 text-2xl font-bold">
        Name: {book.Name} <br>
        Author: {book.Author} <br>
        Genre: {book.Genre}
    </div>
    <div class="w-1/5">
        {console.log(book.id)}
        <AddToCart bookId={book.id}/>
        <button class="w-full h-1/2 bg-orange-400 border-amber-600 border-t-2 rounded-b-lg text-white font-bold hover:bg-orange-500 transition-all">Remove Item</button>
    </div>
</div>