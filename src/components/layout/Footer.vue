<template>
    <footer class="footer app-footer">
        <div class="container">
            <span class="text-muted">© 2017 CrashTested. Portions of the product data © SHARP under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government License v3.0</a>, except where otherwise stated.</span>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style>
body {
    margin-bottom: 60px; /* Margin bottom by footer height */
}

html {
    position: relative;
    min-height: 100%;
}

.app-footer {
    bottom: 0;
    width: 100%;
    height: 60px; /* Set the fixed height of the footer here */
    line-height: 60px; /* Vertically center the text there */
    background-color: #f5f5f5;
}
</style>
