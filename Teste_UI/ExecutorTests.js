var page = require('./PageSicredi');

// executa os 10 cenários de testes de UI ao mesmo tempo
//page.testeSimulador('Cenário X', false, 20, 20, 12, false, 'R$ 1.267')


page.testeSimulador('Cenário 1', false, 2000, 2000, 12, false, 'R$ 256')
page.testeSimulador('Cenário 2', true, 312798, 34578, 10, true, 'R$ 54.903')
page.testeSimulador('Cenário 3', true, 500, 1000, 5, false, '')
page.testeSimulador('Cenário 4', false, 0, 0, 3, true, '')
page.testeSimulador('Cenário 5', false, 0, 0, 0, false, '')
page.testeSimulador('Cenário 6', false, 9550, 0, 0, false, '')
page.testeSimulador('Cenário 7', false, 0, 2553, 0, false, '')
page.testeSimulador('Cenário 8', false, 18000, 0, 14, false, '')
page.testeSimulador('Cenário 9', false, 2238, 8000, 13, true, 'R$ 16.126')
page.testeSimulador('Cenário 10', true, 50000000, 78600, 7, false, 'R$ 516.695')
