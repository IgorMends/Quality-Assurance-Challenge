# Prova Técnica - Analista de Qualidade (QA)📋</br> 
### Estrutura do Projeto</br>

Este repositório contém a resolução da prova técnica para a vaga de Analista de Qualidade (QA).

### Arquivos</br>

| ARQUIVOS             | DESCRIÇÃO                                                                   |
|----------------------|-----------------------------------------------------------------------------|
|RESPOSTAS.md          | → Respostas das questões conceituais, cenários de teste e reportes de bugs. |
|ThirdQuestionPratice  | → Automação E2E referente à Questão 3.                                      |
|FourthQuestionPratice | → Exemplo de teste de API referente à Questão 4.                            |
|README.md             | → Instruções para execução dos testes.                                      |

────────────────────────────────────────────────────────────────────────────

### Tecnologias Utilizadas

- Node.js
- Cypress
- Jest
- Axios

</br>
</br>
────────────────────────────────────────────────────────────────────────────

### **Questão 3 - Automação E2E**

**Fluxo automatizado utilizando o site Sauce Demo:**

1. Realizar login com usuário padrão. (Login.cy.js)
2. Adicionar o produto "Sauce Labs Backpack" ao carrinho. (Carrinho.cy.js)
3. Acessar o carrinho e validar que o produto foi adicionado corretamente. (Carrinho.cy.js)
   
---   

**Executando os testes Cypress**

Instalar dependências:</br>
1. npm install cypress --save-dev
2. npx cypress open 

</br>
</br>
</br>
────────────────────────────────────────────────────────────────────────────

### **Questão 4 - Teste de API**

**Foi desenvolvido um exemplo de teste utilizando Jest e Axios para validar:**

- Retorno HTTP 200.
- Existência do campo quantidade_disponivel.
- Validação do tipo numérico do campo.

Observação: Conforme permitido pelo enunciado da prova, o teste foi implementado utilizando uma resposta mockada para simular o comportamento esperado do endpoint e validar a estrutura das verificações propostas.

---

**Executando os testes de API**

Instalar dependências:</br>
1. npm install jest
2. npm test

</br>
</br>
</br>
────────────────────────────────────────────────────────────────────────────

### **Observações**

- As respostas das questões conceituais estão documentadas no arquivo RESPOSTAS.md.
- Os cenários Gherkin, reportes de bugs e estratégias de testes foram elaborados com foco em boas práticas de Qualidade de Software.
- A automação E2E foi desenvolvida utilizando Cypress.
- Os testes de API foram desenvolvidos utilizando Jest e Axios.
- O objetivo desta entrega é demonstrar conhecimentos em testes manuais, automação, validação de APIs, documentação de defeitos e testes aplicados a fluxos baseados em Inteligência Artificial.
