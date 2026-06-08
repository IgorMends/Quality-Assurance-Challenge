# 	<ins>Questão 1:	</ins>

Feature: Cadastro e Venda de Roupas com Grade Inteligente

---

Scenario: Realizar venda de uma variação com cor e tamanho disponível<br/>
---**Given** que existe o produto "Camiseta Polo"<br/>
---**And** a variação "tamanho M" e "Cor Azul" esta com estoque positivo<br/>
---**And** adiciona o produto ao carrinho<br/>
---**And** usuario confirma venda<br/>
---**Then** venda deve ser concluída com sucesso<br/>
---**And** o estoque da variação deve ser reduzido em uma unidade<br/>

---

Scenario: Impedir venda com combinação de grade sem estoque<br/>
---**Given** que existe o produto "Camiseta Polo"<br/>
---**And** variação "Tamanho P" e "Cor Amarela" não esta com o estoque positivo<br/>
---**When** o cliente seleciona a variação "Tamanho P" e "Cor Amarela"<br/>
---**And** tenta adicionar o produto ao carrinho<br/>
---**Then** a compra não deve ser permitida<br/>
---**And** o sistema deve exibir a mensagem "Produto sem estoque"<br/>

---

Scenario: Garantir que o cadastro de um produto não interfira no outro<br/>
---**Given** que existe o produto "Camiseta Polo" com as variações: [{ "tamanho": "P", "cor": "Azul", "estoque": 10 }, { "tamanho": "M", "cor": "Preto", "estoque": 5 }]<br/>
---**And** existe o produto "Calça Jeans" com as variações: [{ "tamanho": "P", "cor": "Azul", "estoque": 8}, { "tamanho": "M", "cor": "Preto", "estoque": 12 }]<br/>
---**When** o usuario altera o estoque da variação "P" e "Azul" da "Camiseta Polo" para 0<br/>
---**Then** o estoque das variações da "Calça Jeans" deve permanecer inalterado<br/>
---**And** as variações da "Calça Jeans" devem continuar disponíveis para venda<br/>
---**And** apenas a variação alterada da "Camiseta Polo" deve refletir a mudança de estoque<br/>

---

Scenario: Permitir venda de outras combinações quando uma delas estiver sem estoque<br/>
---**Given** que existe o produto "Camiseta Polo"<br/>
---**And** a variação "Tamanho P" e "Cor Azul" não esta positiva no estoque<br/>
---**And** a variação "Tamanho M" e "Cor Azul" esta positiva no estoque<br/>
---**When** o cliente seleciona a variação "Tamanho M" e "Cor Azul"<br/>
---**And** adiciona o produto ao carrinho<br/>
---**Then** a compra deve ser permitida<br/>
---**And** a indisponibilidade da variação "Tamanho P" não deve impactar as demais variações<br/>

---

Scenario: Impedir compra acima da quantidade disponível<br/>
---**Given** que existe o produto "Camiseta Polo"<br/>
---**And** a variação "Tamanho G" e "Cor Preta" possui 3 unidades em estoque<br/>
---**When** o cliente tenta adicionar 4 unidades da variação "Tamanho G" e "Cor Preta" ao carrinho<br/>
---**Then** a compra não deve ser permitida<br/>
---**And** o sistema deve informar que a quantidade solicitada excede o estoque disponível<br/>

---

Scenario: Impedir venda sem selecionar todas as variações obrigatórias<br/>
---**Given** que existe o produto "Camiseta Polo"<br/>
---**When** o usuario seleciona apenas o tamanho "M"<br/>
---**And** tenta finalizar a venda<br/>
---**Then** a venda não deve ser permitida<br/>
---**And** o sistema deve solicitar a seleção da cor<br/>

---

# 	<ins>Questão 2:	</ins><br/>

## __Bug Report__

### Título: Produto "Camiseta Polo" é adicionado ao carrinho com preço R$ 0,00 na combinação Cor Preto + Tamanho GG<br/>

### Prioridade: Alta (High)<br/>

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
