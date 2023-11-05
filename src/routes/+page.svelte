<script lang="ts">
    import * as AutoComplete from './autocomplete';

</script>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>My Page</title>
    </head>
    <body>
        <div class="wrapper center">
            <div class="items center">
                <div class="columns">

                </div>
                <div class="columns">
                    <button
                    id="submit"
                    title="submit"
                    on:click={() => {
                        AutoComplete.PopulateWords("hellow");
                    }}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    </body>

</html>
<style>
    html, body {
        background-image: linear-gradient(to bottom right, #4CA837, #fff);
        margin: 0px;
        padding: 0px;
        --fontsize: 20px;
    }

    :global(html) {
        margin: 0px;
        padding: 0px;
    }

    body {
        color: var(--neutralheavy);
        height: 100vh;
        width: 100vw;
        position: relative;
        overflow: hidden;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .wrapper {
        display: grid;
        grid-template: 15% 60% 15% / 1fr;
        transition: grid-template 0.5s ease;
        vertical-align: middle;
        text-align: center;
        height: 100%;
        width: 100%;
        transition: 0.5s;
    }

    div.items {
        grid-row: 2;
        width: 80%;
        max-width: 1200px;
        height: 100%;
        max-height: 800px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        border-radius: 25px;
        background-color: green;
        border: 2px solid yellow;
        margin: auto;
        font-size: var(--fontsize);
        grid-column-start: initial;
    }

    * {
        box-sizing: border-box;
        font-family: ExoRegular, Arial, Helvetica, sans-serif;
    }
    div.columns {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        gap: 8px;
        padding: 20px;
        background-color: gray;
    }

    button {
        border-radius: 25px;
        min-width: 60px;
        border: 2px solid #0000dd;
        font-size: var(--fontsize);
        line-height: 24px;
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

    button:disabled {
        color: var(--neutraldark);
    }

    button:not(:focus-visible) {
        border: 2px solid var(--divback);
    }

    @media(hover: hover) {
        button:hover, button:focus-visible {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
            -ms-transform: scale(1.1);
        }
    }
    button:active {
        transform: scale(0.9);
        -webkit-transform: scale(0.9);
        -moz-transform: scale(0.9);
        -o-transform: scale(0.9);
        -ms-transform: scale(0.9);
    }
</style>