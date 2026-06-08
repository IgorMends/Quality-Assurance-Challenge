#Questão 1:

Feature: Cadastro e Venda de Roupas com Grade Inteligente

---

Scenario: Realizar venda de uma variação com cor e tamanho disponível
Given que existe o produto "Camiseta Polo"
And a variação "tamanho M" e "Cor Azul" esta com estoque positivo
And adiciona o produto ao carrinho
And usuario confirma venda
Then venda deve ser concluída com sucesso
And o estoque da variação deve ser reduzido em uma unidade

---

Scenario: Impedir venda com combinação de grade sem estoque
Given que existe o produto "Camiseta Polo"
And variação "Tamanho P" e "Cor Amarela" não esta com o estoque positivo
When o cliente seleciona a variação "Tamanho P" e "Cor Amarela"
And tenta adicionar o produto ao carrinho
Then a compra não deve ser permitida
And o sistema deve exibir a mensagem "Produto sem estoque"

---

Scenario: Garantir que o cadastro de um produto não interfira no outro
Given que existe o produto "Camiseta Polo" com as variações:
[{ "tamanho": "P", "cor": "Azul", "estoque": 10 }, { "tamanho": "M", "cor": "Preto", "estoque": 5 }]
And existe o produto "Calça Jeans" com as variações:
[{ "tamanho": "P", "cor": "Azul", "estoque": 8}, { "tamanho": "M", "cor": "Preto", "estoque": 12 }]
When o usuario altera o estoque da variação "P" e "Azul" da "Camiseta Polo" para 0
Then o estoque das variações da "Calça Jeans" deve permanecer inalterado
And as variações da "Calça Jeans" devem continuar disponíveis para venda
And apenas a variação alterada da "Camiseta Polo" deve refletir a mudança de estoque

---

Scenario: Permitir venda de outras combinações quando uma delas estiver sem estoque
Given que existe o produto "Camiseta Polo"
And a variação "Tamanho P" e "Cor Azul" não esta positiva no estoque
And a variação "Tamanho M" e "Cor Azul" esta positiva no estoque
When o cliente seleciona a variação "Tamanho M" e "Cor Azul"
And adiciona o produto ao carrinho
Then a compra deve ser permitida
And a indisponibilidade da variação "Tamanho P" não deve impactar as demais variações

---

Scenario: Impedir compra acima da quantidade disponível
Given que existe o produto "Camiseta Polo"
And a variação "Tamanho G" e "Cor Preta" possui 3 unidades em estoque
When o cliente tenta adicionar 4 unidades da variação "Tamanho G" e "Cor Preta" ao carrinho
Then a compra não deve ser permitida
And o sistema deve informar que a quantidade solicitada excede o estoque disponível

---

Scenario: Impedir venda sem selecionar todas as variações obrigatórias
Given que existe o produto "Camiseta Polo"
When o usuario seleciona apenas o tamanho "M"
And tenta finalizar a venda
Then a venda não deve ser permitida
And o sistema deve solicitar a seleção da cor

---

#Questão 2:

##Bug Report

###Título: Produto "Camiseta Polo" é adicionado ao carrinho com preço R$ 0,00 na combinação Cor Preto + Tamanho GG

###Prioridade: Alta (High)

###Ambiente

- Módulo: Cadastro e Venda de Roupas com Grade Inteligente

###Passos para Reproduzir

-Acessar o módulo e-commerce/Frente de caixa.
-Selecionar o produto "Camiseta Polo".
-Escolher a cor "Preto".
-Escolher o tamanho "GG".
-Adicionar o produto ao carrinho.
-Verificar o preço unitário exibido no carrinho.
-Posseguir para o checkout e finalizar a compra.

###Resultado Esperado
-O produto deve manter o preço cadastrado de R$ 89,90 (ou o valor definido no cadastro da variação).
-O valor total da compra deve refletir corretamente o preço do produto.
-O sistema não deve permitir a finalização da compra com valor incorreto.

###Resultado Atual
-Ao selecionar a combinação Cor "Preto" e Tamanho "GG", o preço unitário é alterado para R$ 0,00 no carrinho.
-O valor total da compra é calculado incorretamente.
-O usuário consegue concluir o checkout sem efetuar pagamento pelo produto.

###Impacto
-Perda financeira devido à venda gratuita de produtos.
-Divergência entre faturamento e estoque.
-Possível exploração por clientes ao identificar a falha.

###Evidências Recomendadas
-Captura de tela do produto antes da seleção da variação.
-Captura de tela do carrinho exibindo o valor R$ 0,00.
-Vídeo da reprodução completa do problema.
-Payload da requisição de adição ao carrinho.
-Logs do backend contendo os dados da variação (cor, tamanho, SKU e preço).
-Identificador do produto e da combinação afetada (Preto + GG).
