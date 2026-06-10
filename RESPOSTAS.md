# <ins>Questão 1: </ins>

Feature: Cadastro e Venda de Roupas com Grade Inteligente

Scenario: Realizar venda de uma variação com cor e tamanho disponível<br/>

    - Given que existe o produto "Camiseta Polo"
    - And a variação "tamanho M" e "Cor Azul" esta com estoque positivo
    - And adiciona o produto ao carrinho
    - And usuario confirma venda
    - Then venda deve ser concluída com sucesso
    - And o estoque da variação deve ser reduzido em uma unidade

---

Scenario: Impedir venda com combinação de grade sem estoque<br/>

    - Given que existe o produto "Camiseta Polo"
    - And variação "Tamanho P" e "Cor Amarela" não esta com o estoque positivo
    - When o cliente seleciona a variação "Tamanho P" e "Cor Amarela"
    - And tenta adicionar o produto ao carrinho
    - Then a compra não deve ser permitida
    - And o sistema deve exibir a mensagem "Produto sem estoque"

---

Scenario: Garantir que o cadastro de um produto não interfira no outro<br/>

    - Given que existe o produto "Camiseta Polo" com as variações: [{ "tamanho": "P", "cor": "Azul", "estoque": 10 }, { "tamanho": "M", "cor": "Preto", "estoque": 5 }
    - And existe o produto "Calça Jeans" com as variações: [{ "tamanho": "P", "cor": "Azul", "estoque": 8}, { "tamanho": "M", "cor": "Preto", "estoque": 12 }]
    - When o usuario altera o estoque da variação "P" e "Azul" da "Camiseta Polo" para 0
    - Then o estoque das variações da "Calça Jeans" deve permanecer inalterado
    - And as variações da "Calça Jeans" devem continuar disponíveis para venda
    - And apenas a variação alterada da "Camiseta Polo" deve refletir a mudança de estoque

---

Scenario: Permitir venda de outras combinações quando uma delas estiver sem estoque<br/>

    - Given que existe o produto "Camiseta Polo"
    - And a variação "Tamanho P" e "Cor Azul" não esta positiva no estoque
    - And a variação "Tamanho M" e "Cor Azul" esta positiva no estoque
    - When o cliente seleciona a variação "Tamanho M" e "Cor Azul"
    - And adiciona o produto ao carrinho
    - Then a compra deve ser permitida
    - And a indisponibilidade da variação "Tamanho P" não deve impactar as demais variações

---

Scenario: Impedir compra acima da quantidade disponível<br/>

    - Given que existe o produto "Camiseta Polo"
    - And a variação "Tamanho G" e "Cor Preta" possui 3 unidades em estoque
    - When o cliente tenta adicionar 4 unidades da variação "Tamanho G" e "Cor Preta" ao carrinho
    - Then a compra não deve ser permitida
    - And o sistema deve informar que a quantidade solicitada excede o estoque disponível

---

Scenario: Impedir venda sem selecionar todas as variações obrigatórias<br/>

    - Given que existe o produto "Camiseta Polo"
    - When o usuario seleciona apenas o tamanho "M"
    - And tenta finalizar a venda
    - Then a venda não deve ser permitida
    - And o sistema deve solicitar a seleção da cor

────────────────────────────────────────────────────────────────────────────

<br/>
<br/>
<br/>

# <ins>Questão 2: </ins><br/>

## **[Bug Report] Título: Produto "Camiseta Polo" é adicionado ao carrinho com preço unitário R$ 0,00 na combinação Cor Preto + Tamanho GG**<br/>
|             |            |                                  Justificativa                                 |
|-------------|------------|--------------------------------------------------------------------------------|
| Severidade  | Alto       | Falha grave com interrupção parcial, mas que afeta funcionalidades essenciais. |
| Prioridade  | Urgente    | Isto afeta diretamente no faturamento da empresa                               |

### Ambiente<br/>

- Módulo: Cadastro e Venda de Roupas com Grade Inteligente<br/>

### Passos para Reproduzir<br/>

- Acessar o módulo e-commerce/Frente de caixa.<br/>
- Selecionar o produto "Camiseta Polo".<br/>
- Escolher a cor "Preto".<br/>
- Escolher o tamanho "GG".<br/>
- Adicionar o produto ao carrinho.<br/>
- Verificar o preço unitário exibido no carrinho.<br/>
- Posseguir para o checkout e finalizar a compra.<br/>

### Resultado Esperado<br/>

- O produto deve manter o preço cadastrado de R$ 89,90 (ou o valor definido no cadastro da variação).<br/>
- O valor total da compra deve refletir corretamente o preço do produto.<br/>
- O sistema não deve permitir a finalização da compra com valor incorreto.<br/>

### Resultado Atual<br/>

- Ao selecionar a combinação Cor "Preto" e Tamanho "GG", o preço unitário é alterado para R$ 0,00 no carrinho.<br/>
- O valor total da compra é calculado incorretamente.<br/>
- O usuário consegue concluir o checkout sem efetuar pagamento pelo produto.<br/>

### Impacto<br/>

- Perda financeira devido à venda gratuita de produtos.<br/>
- Divergência entre faturamento e estoque.<br/>
- Possível exploração por clientes ao identificar a falha.<br/>

### Evidências Recomendadas<br/>

- Captura de tela do produto antes da seleção da variação.<br/>
- Captura de tela do carrinho exibindo o valor R$ 0,00.<br/>
- Vídeo da reprodução completa do problema.<br/>
- Payload da requisição de adição ao carrinho.<br/>
- Logs do backend contendo os dados da variação (cor, tamanho, SKU e preço).<br/>
- Identificador do produto e da combinação afetada (Preto + GG).<br/>

────────────────────────────────────────────────────────────────────────────

<br/>
<br/>
<br/>

# <ins>Questão 3: </ins><br/>

  ### Esta parte possui uma pasta contendo o script básico utilizando o Cypress (ThirdQuestionPratice)

────────────────────────────────────────────────────────────────────────────

<br/>
<br/>
<br/>

# <ins>Questão 4: </ins><br/>

## **Part I:** <br/>

### 1. Status Codes <br/>

- 200 OK: produto encontrado e consulta realizada com sucesso.<br/>
- 400 Bad Request: parâmetros obrigatórios ausentes ou inválidos (id, cor ou tamanho).<br/>
- 404 Not Found: produto não encontrado.<br/>
- 500 Internal Server Error: falha interna do servidor ou indisponibilidade do banco de dados.<br/>

### 2. Validação dos parâmetros de entrada<br/>

ID<br/>

- Deve ser numérico.<br/>
- Deve ser maior que zero.<br/>
- Não deve ser nulo.<br/>

COR<br/>

- Deve ser uma string válida.<br/>
- Não deve ser vazia.<br/>
- Deve corresponder a uma cor cadastrada para o produto.<br/>

TAMANHO<br/>

- Deve ser uma string válida.<br/>
- Não deve ser vazio.<br/>
- Deve corresponder a um tamanho disponível para o produto.<br/>

### 3. Validação da resposta<br/>

Exemplo de resposta esperada:<br/>

```json
{
  "produto_id": 123,
  "cor": "azul",
  "tamanho": "M",
  "quantidade_disponivel": 15
}
```

Validações:<br/>

O campo quantidade_disponivel deve existir.<br/>
O campo quantidade_disponivel deve ser numérico.<br/>
O valor não deve ser negativo.<br/>
Os campos produto_id, cor e tamanho devem corresponder aos parâmetros informados na requisição.<br/>

### 4. Caminhos de exceção<br/>

Também validaria cenários de erro e borda:<br/>

- Produto inexistente.<br/>
- Cor inexistente para o produto.<br/>
- Tamanho inexistente para o produto.<br/>
- Produto sem estoque (quantidade_disponivel = 0).<br/>
- Parâmetros vazios ou inválidos.<br/>
- Falha de comunicação com banco de dados.<br/>
- Timeout da API.<br/>
- Retorno sem o campo quantidade_disponivel.<br/>
- Retorno com tipo incorreto (por exemplo, "15" em vez de 15).<br/>

<br/>

## **Part II:** <br/>

  ### **Esta parte possui uma pasta com o exemplo de teste de API utilizando o JEST e o Axios. (FourthQuestionPratice)**

────────────────────────────────────────────────────────────────────────────

<br/>
<br/> 
<br/>

# <ins>Questão 5: </ins><br/>


Para o "Caminho Feliz", criaria cenários em que o usuário fornece exatamente as informações solicitadas pela IA. O objetivo seria validar se o fluxo é seguido corretamente, se a IA interpreta os dados informados, faz as perguntas adequadas e conclui o processo esperado sem erros ou desvios.<br/>

<br/>

Para o "Fallback", eu criaria testes com entradas que fogem do fluxo esperado, como mensagens aleatórias, emojis, respostas ambíguas, palavras ofensivas ou informações que não respondem à pergunta feita pela IA. O objetivo seria validar se o agente consegue identificar que a entrada não é válida, manter uma comunicação adequada e orientar o usuário para fornecer a informação correta. Também verificaria se a IA mantém o contexto da conversa, evita respostas incoerentes ou inadequadas e continua funcionando normalmente mesmo após múltiplas tentativas de interação inválida. Dessa forma, é possível garantir que o sistema seja resiliente e ofereça uma boa experiência ao usuário mesmo em situações inesperadas.<br/>

────────────────────────────────────────────────────────────────────────────

<br/>
<br/> 
<br/>

# <ins>Questão 6: </ins><br/>


## [Bug Report] Título: Retorno HTTP 500 nos Webhooks ao receber mensagens de áudio ou imagem<br/>

|             |            |                                  Justificativa                                 |
|-------------|------------|--------------------------------------------------------------------------------|
| Severidade  | Alto       | Falha grave com interrupção parcial, mas que afeta funcionalidades essenciais. |
| Prioridade  | Alta       | Clientes fica com sem receber mais nenhuma mensagem do bot                     |

### Descrição<br/>

Durante os testes de integração entre o WhatsApp e a plataforma, foi identificado que mensagens de texto são processadas com sucesso. No entanto, ao enviar uma mensagem de áudio ou uma imagem, o webhook recebe o evento, mas não consegue processar o payload recebido, retornando erro HTTP 500 em vista da  ocorrência do erro, o fluxo de atendimento do cliente fica travado e nenhuma nova resposta é enviada pelo bot.<br/>

<br/>

### Passos para Reproduzir<br/>

- Configurar o webhook da plataforma apontando para o número de teste do WhatsApp<br/>
- Enviar uma mensagem de texto → Funciona normalmente<br/>
- Enviar uma mensagem de áudio (gravação de voz) ou imagem pelo WhatsApp<br/>
- Observar o retorno do webhook nos logs do servidor<br/>
- Tentar enviar qualquer mensagem de texto em seguida<br/>

### Resultado Atual<br/>

- O webhook retorna HTTP 500 (Internal Server Error).<br/>
- O payload de áudio ou imagem não é processado corretamente.<br/>
- O fluxo da conversa é interrompido.<br/>
- O cliente deixa de receber respostas do bot.<br/>

### Resultado Esperado<br/>
- O webhook deve processar corretamente mensagens de áudio e imagem ou tratá-las adequadamente caso não sejam suportadas.<br/>
- Não deve ocorrer retorno HTTP 500 para eventos válidos enviados pelo WhatsApp.<br/>
- O fluxo da conversa deve permanecer ativo.<br/>
- O usuário deve receber uma resposta apropriada, informando, por exemplo, que aquele tipo de mensagem não é suportado.<br/>

### Evidências Técnicas<br/>

Status Code: HTTP 500 (Internal Server Error)<br/>

Exemplo de payload recebido (imagem):<br/>

```json
{
  "messageId": "msg_8f72ab91",
  "from": "5511999999999",
  "type": "image",
  "timestamp": "2025-06-09T14:32:10Z",
  "image": {
    "fileName": "foto.jpg",
    "mimeType": "image/jpeg",
    "url": "https://storage.example.com/image/foto.jpg"
  }
}
```
<br/>

Exemplo de payload recebido (áudio):<br/>

```json
{
  "messageId": "msg_4d93ce22",
  "from": "5511888888888",
  "type": "audio",
  "timestamp": "2025-06-09T14:35:27Z",
  "audio": {
    "fileName": "audio.ogg",
    "mimeType": "audio/ogg",
    "url": "https://storage.example.com/audio/audio.ogg"
  }
}
```
<br/>

Logs:<br/>
Verificar os logs do backend no momento do recebimento dos eventos de áudio e imagem para identificar a exceção gerada durante o processamento do payload.<br/>

### Impacto<br/>

- Clientes que enviam áudio ou imagem têm o fluxo interrompido, impossibilitando a continuidade do atendimento automatizado.<br/>

────────────────────────────────────────────────────────────────────────────

<br/>
<br/> 
<br/>

# <ins>Questão 7: </ins><br/><br/>

Nesse cenário, eu executaria novamente os principais fluxos já homologados para garantir que a alteração no prompt impactou apenas o tom de voz da IA. Criaria casos de teste com entradas conhecidas, validando se a IA continua solicitando e capturando corretamente as informações do cliente, como nome e outros dados necessários. Após a interação, verificaria nos logs, na API ou diretamente no banco de dados se as informações foram registradas corretamente.<br/>

<br/>

Também compararia os resultados obtidos antes e depois da alteração do prompt para confirmar que apenas o tom das respostas mudou, sem afetar as regras de negócio, as integrações ou o fluxo da conversa. O objetivo é garantir que a IA mantenha o mesmo comportamento funcional, alterando apenas a forma de comunicação com o usuário.<br/>

<br/>
────────────────────────────────────────────────────────────────────────────
