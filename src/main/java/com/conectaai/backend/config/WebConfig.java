package com.conectaai.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // A configuração de CORS foi movida para securityConfig.java para evitar conflitos
        // quando o Spring Security está habilitado.
        // Se você precisar de outras configurações MVC aqui no futuro, adicione-as.
        // Exemplo (comentado):
        // registry.addMapping("/some-other-path/**")
        //         .allowedOrigins("http://another-frontend.com");
    }
}
