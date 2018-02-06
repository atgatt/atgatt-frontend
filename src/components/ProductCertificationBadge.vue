<template>
    <li v-if="certification">
        <i class="fa-li fa fa-check cert" />
        <span class="badge badge-success">
            {{certificationName}}
            <span v-if="certification.stars">
              - {{certification.stars}} Stars
            </span>
        </span>
    </li>
    <li v-else>
        <i class="fa-li fa fa-times cert-missing" />
        <span class="badge badge-danger">
            {{certificationName}}
        </span>
    </li>
</template>

<script>
export default {
  name: 'ProductCertificationBadge',
  props: ['certificationName', 'certification']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cert {
    color: #28a745;
}

.cert-missing {
    color: #dc3545;
}
</style>
