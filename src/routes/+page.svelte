<script lang="ts">
    import * as AutoComplete from './autocomplete';
    import { related } from './autocomplete';

    const debug: boolean = false;
    var responsive: boolean = false;
    var userString = "";
    var matrix: number[][] = [];

    function ChangeResponsive() {
        if (userString === "")
            AutoComplete.PopulateWords([""])
        else if (responsive) {
            AutoComplete.CompareWords(userString, 15, 2, 1 ,3);
        }
        else
            AutoComplete.CompareWords(userString, 17, 2, 1 ,3);
        responsive = !responsive
    }

</script>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Auto Complete</title>
    </head>
    <body>
        <div class="wrapper">
            <div class="items">
                <label for="textinput">
                enter word
                </label>
                <div id="inputwrapper">
                    <input
                    type="text"
                    id="textinput"
                    name="textinput"
                    placeholder="type here!"
                    title="type here!"
                    bind:value={userString}
                    on:keydown={(e) => {
                        if (!responsive && (e.key === 'Enter'))
                            AutoComplete.CompareWords(userString, 15, 2, 1 ,3);
                    }}
                    on:input={() => {
                        if (responsive)
                            AutoComplete.CompareWords(userString, 17, 2, 1 ,3);
                    }}
                    >
                    <label
                    class="switch"
                    for="responsive"
                    title="responsive"
                    >
                        <input
                        type="checkbox"
                        id="responsive"
                        name="responsive"
                        checked={responsive}
                        on:click={() => {
                            ChangeResponsive();
                        }}
                        >
                        <span class="slider"></span>
                    </label>
                </div>
                {#if !responsive}
                    <button
                    id="submit"
                    title="submit"
                    on:click={() => {
                        AutoComplete.CompareWords(userString, 15, 2, 1, 3);
                    }}
                    >
                        submit
                    </button>
                {/if}
                <p id="resultslabel">results</p>
                <div 
                id="results"
                >
                    {#each $related as string}
                        <p class="result">{string}</p>
                    {/each}
                </div>
            </div>
        </div>
        {#if debug}
            <button
            id="testmatrix"
            title="testmatrix"
            on:click={() => {
                matrix = AutoComplete.PrintMatrix(userString);
            }}
            >
            test matrix
            </button>
            <br>
            {#if matrix}
                {#each matrix as outer}
                <p class="debug">
                    {#each outer as inner}
                        {inner}&nbsp;
                    {/each}
                </p>
                {/each}
            {/if}
        {/if}
    </body>

</html>
<style>
    html, body {
        background-image: linear-gradient(to bottom right, #B29BFA, #FA9BD3);
        margin: 0px;
        padding: 0px;
        font-size: 24px;
    }

    :global(html), :global(body) {
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

    .debug {
        color: #ff0000;
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
        flex-flow: column;
        border-radius: 25px;
        background-color: #575163;
        column-gap: 8px;
        padding: 4px;
        width: 100%;
        height: 100%;
        overflow: scroll;
        text-align: left;
        box-sizing: border-box;
    }

    label {
        color: #9BA3FA;
    }

    #inputwrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    input[type="text"] {
        padding: 20px;
        font-size: 24px;
        border-radius: 25px;
        height: 24px;
        width: calc(100% - 88px);
        color: #1b1429;
        background-color: #9BA3FA;
        border: none;
        text-align: center;
        box-shadow: none;
        outline: none;
    }

    input:focus {
        outline: none;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 76px;
        height: 44px;
        margin: 0px;
        padding: 0px;
        transition: all .2s ease-in-out;
        animation: fadeIn .5s;
        -webkit-animation: fadeIn .5s;
        -moz-animation: fadeIn .5s;
        -o-animation: fadeIn .5s;
        -ms-animation: fadeIn .5s;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0px;
        padding: 0px;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #575163;
        -webkit-transition: .5s;
        transition: .5s;
        border-radius: 25px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 36px;
        width: 36px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #D19BFA;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #D19BFA;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(32px);
        -ms-transform: translateX(32px);
        transform: translateX(32px);
    }

    p {
        margin: 0px;
        padding: 0px;
    }

    button {
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

    button:disabled {
        color: #D19BFA;
    }

    button:not(:focus-visible) {
        border: 2px solid #D19BFA;
    }

    @media(hover: hover) {
        button:hover, button:focus-visible {
            transform: scale(1.05);
            -webkit-transform: scale(1.05);
            -moz-transform: scale(1.05);
            -o-transform: scale(1.05);
            -ms-transform: scale(1.05);
        }
        .switch:hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
            -ms-transform: scale(1.1);
        }
    }

    button:active {
        transform: scale(0.95);
        -webkit-transform: scale(0.95);
        -moz-transform: scale(0.95);
        -o-transform: scale(0.95);
        -ms-transform: scale(0.95);
    }
</style>