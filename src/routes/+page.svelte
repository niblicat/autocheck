<script lang="ts">
    import * as AutoComplete from './autocomplete';
    import { related } from './autocomplete';

    let userString = "";
</script>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>My Page</title>
    </head>
    <body>
        <div class="wrapper">
            <div class="items">
                <label
                for="textinput"
                
                >
                enter word
                </label>
                <form>
                    
                </form>
                <input
                type="text"
                id="textinput"
                name="textinput"
                placeholder="type here!"
                bind:value={userString}
                on:keydown={(e) => {
                    if (e.key === 'Enter')
                    AutoComplete.PopulateWords(userString);
                }}
                >
                <button
                id="submit"
                title="submit"
                on:click={() => {
                    AutoComplete.PopulateWords(userString);
                }}
                >
                    submit
                </button>
                <p id="resultslabel">results</p>
                <div id="results">
                    {#each $related as string}
                        <p>{string}</p>
                    {/each}
                </div>
            </div>
        </div>
    </body>

</html>
<style>
    html, body {
        background-image: linear-gradient(to bottom right, #B29BFA, #FA9BD3);
        margin: 0px;
        padding: 0px;
        font-size: 24px;
    }

    :global(html) {
        margin: 0px;
        padding: 0px;
    }

    body {
        color: #F09BFA;
        height: 100vh;
        width: 100vw;
        position: relative;
        overflow: hidden;
    }

    div.wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        align-items: stretch;
        margin-top: 20px;
        margin-bottom: 20px;
        transition: 0.5s;
    }

    * {
        box-sizing: border-box;
        font-family: ExoRegular, Arial, Helvetica, sans-serif;
    }
    div.items {
        display: flex;
        position: absolute;
        flex-direction: column;
        height: 100%;
        max-height: calc(100% - 40px);
        width: 100%;
        max-width: 600px;
        gap: 8px;
        padding: 20px;
        border-radius: 25px;
        border: 2px solid #FA9B9B;
        background-color: #1b1429;
    }

    #resultslabel {
        cursor: default;
    }

    #results {
        display: flex;
        flex-flow: column wrap;
        border-radius: 25px;
        background-color: #575163;
        padding: 4px;
        height: 100%;
        overflow: hidden;
        text-align: left;
    }

    label {
        color: #9BA3FA;
    }

    #textinput {
        padding: 20px;
        font-size: 24px;
        margin-bottom: 20px;
        border-radius: 25px;
        height: 24px;
        color: #1b1429;
        background-color: #9BA3FA;
        border: none;
        text-align: center;
        box-shadow: none;
        outline: none;
    }

    #textinput:focus {
        outline: none;
    }

    p {
        margin: 0px;
        padding: 0px;
    }

    #submit {
        margin-bottom: 8px;
        border-radius: 25px;
        min-width: 60px;
        border: 2px solid #D19BFA;
        background-color: #575163;
        color: #D19BFA;
        font-size: 24px;
        height: 54px;
        text-align: center;
        cursor: pointer;
        pointer-events: auto;
        transition: all .2s ease-in-out;
        animation: fadeIn .5s;
        -webkit-animation: fadeIn .5s;
        -moz-animation: fadeIn .5s;
        -o-animation: fadeIn .5s;
        -ms-animation: fadeIn .5s;
    }

    #submit:disabled {
        color: #D19BFA;
    }

    #submit:not(:focus-visible) {
        border: 2px solid #D19BFA;
    }

    @media(hover: hover) {
        #submit:hover, #submit:focus-visible {
            transform: scale(1.05);
            -webkit-transform: scale(1.05);
            -moz-transform: scale(1.05);
            -o-transform: scale(1.05);
            -ms-transform: scale(1.05);
        }
    }
    #submit:active {
        transform: scale(0.95);
        -webkit-transform: scale(0.95);
        -moz-transform: scale(0.95);
        -o-transform: scale(0.95);
        -ms-transform: scale(0.95);
    }
</style>