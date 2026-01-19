<template>
    <LandingHeader />
    <LandingHero />
    <LandingStats />
    <LandingHowItWorks />
    
    <LandingCTASection 
        title="Comece sua jornada no inglês hoje" 
        subtitle="Junte-se à comunidade de alunos"
        :showUsersIcon="true"
    />

    <LandingTestimonials />

    <LandingCTASection 
        variant="secondary"
        title="Pronto para começar?" 
        description="Acesse agora e comece a evoluir seu inglês com textos e áudios de qualidade."
    />

    <LandingFooter />
</template>

<script setup>
import LandingHeader from '../components/Landing/LandingHeader.vue'
import LandingHero from '../components/Landing/LandingHero.vue'
import LandingStats from '../components/Landing/LandingStats.vue'
import LandingHowItWorks from '../components/Landing/LandingHowItWorks.vue'
import LandingCTASection from '../components/Landing/LandingCTASection.vue'
import LandingTestimonials from '../components/Landing/LandingTestimonials.vue'
import LandingFooter from '../components/Landing/LandingFooter.vue'
</script>