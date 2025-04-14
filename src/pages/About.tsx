
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 section-title">Sobre Nós</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
          <p className="mb-4">
            Fundada em 2010, nossa empresa nasceu com a missão de oferecer produtos personalizados de alta qualidade para empresas, eventos e indivíduos que desejam destacar sua marca ou ocasião especial.
          </p>
          <p className="mb-4">
            Ao longo dos anos, construímos uma sólida reputação no mercado, baseada em nosso compromisso com a excelência em cada peça que produzimos. Nossa equipe de profissionais talentosos trabalha incansavelmente para garantir que cada produto atenda aos mais altos padrões de qualidade.
          </p>
          <p>
            Hoje, estamos orgulhosos de sermos reconhecidos como líderes em produtos personalizados, atendendo clientes em todo o país.
          </p>
        </div>
        <div className="bordered-section p-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop" 
            alt="Equipe trabalhando"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Nossos Valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bordered-section">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Qualidade</h3>
            <p>Comprometimento com a excelência em todos os produtos que produzimos, utilizando os melhores materiais e técnicas de produção.</p>
          </CardContent>
        </Card>
        <Card className="bordered-section">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Inovação</h3>
            <p>Busca constante por novas tecnologias e métodos para oferecer produtos cada vez melhores e mais personalizados.</p>
          </CardContent>
        </Card>
        <Card className="bordered-section">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Atendimento</h3>
            <p>Foco no cliente e em suas necessidades, proporcionando uma experiência excepcional do início ao fim do processo.</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bordered-section p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Proporcionar soluções criativas e produtos personalizados de alta qualidade que fortaleçam a identidade de marcas e tornem momentos especiais ainda mais memoráveis.
        </p>
      </div>
    </div>
  );
};

export default About;
