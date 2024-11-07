<script>
    import '../app.css';
    import Nav from '../components/Nav.svelte'
    import { page } from '$app/stores';

    let {children} = $props();

    import {auth} from "$lib/firebase/firebase.client.js"
    import {authStore} from "../stores/authStore.js";

    import {onDestroy, onMount} from "svelte";

    let unsubscribeAuth;

    onMount(() => {
        unsubscribeAuth = auth.onAuthStateChanged((user) => {
            authStore.update((curr) => {
                return {...curr, isLoading: false, currentUser: user}
            })
        })
    })

    onDestroy(() => {
        unsubscribeAuth && unsubscribeAuth()
    })
</script>

{#if !$page.url.pathname.toString().startsWith('/api/v1/')}
    <Nav />
{/if}

{@render children()}
