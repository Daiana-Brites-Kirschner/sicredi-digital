module.exports = {
	
// recebe: nome do cenário, flag para controle "para vc" ou "empresa/agronegócio",
//         valor da aplicação inicial, valor do investimento mensal,
//         tempo de meses ou anos, flag para controle meses ou anos, resultado esperado
testeSimulador: function(testName, perfilEmpresa, valorAplicar, valorInvestir, tempo, emAnos, resultado){

	var webdriver = require('selenium-webdriver')
		By = webdriver.By
		until = webdriver.until

	const urlSimulador = 'https://www.sicredi.com.br/html/ferramenta/simulador-investimento-poupanca/'
	
    var driver = new webdriver.Builder().forBrowser('chrome').build()

    driver.get(urlSimulador).then(()=> {
        console.log(testName + ' #Passo 0 - digitar dados de entrada e encontrar o botão')

        // se for perfil Empresa/Agronecócio
        if(perfilEmpresa){
            // seleciona a 2ª opção do radio button
            driver.executeScript("document.getElementsByName('perfil')[1].checked=true")
        }
        driver.findElement(By.id('valorAplicar')).sendKeys(valorAplicar)
        driver.findElement(By.id('valorInvestir')).sendKeys(valorInvestir)
        driver.findElement(By.id('tempo')).sendKeys(tempo)
        // se for tempo em Anos, então seleciona opção 'Anos'
        if(emAnos){
            // obs: Campo 'periodo' é do tipo hidden e por isso precisa ser setado desta maneira
            driver.executeScript("document.getElementById('periodo').setAttribute('value', 'A')")
        }

        // encontra elemento botão através do css
        var button = driver.findElement(By.css('button[type="submit"]'))
        button.then(() => {
            console.log(testName + ' #Passo 1 - clicar no botão')
            button.click()
    
            console.log(testName + ' #Passo 2 - esperar 5seg para carregar a tela com resultados')
            // Obs: é possível melhorar esta parte para não precisar esperar sempre os 5seg
            // utilizando: driver.wait(until.elementLocated(By.className('valores')),5000)
            driver.sleep(5000).then(() => {
                console.log(testName + ' #Passo 3 - buscar campo texto com valor calculado')
 
                var valorTxt = driver.findElement(By.className('valor')).getText()
                valorTxt.then((element) => {
                    console.log(testName + ' #Passo 4 - validar conteúdo do campo texto com valor calculado')
    
                    if(element === resultado){
                        console.log(testName + ' #Passo 5 - TESTE OK! Valor esperado de ' + resultado)
                    }              
                })

                console.log(testName + ' #Passo 6 - buscar campo texto com a número de meses')
                // Obs: foi preciso utilizar a busca do elmento através do xpath, pois o mesmo não tem id e existem 2 campos
                //      com a mesma class 'texto' na página
                var textoMesTxt = driver.findElement(By.xpath("//div[@class='blocoResultadoSimulacao']/span[@class='texto']")).getText()
                textoMesTxt.then((element) => {
                    console.log(testName + ' #Passo 7 - validar conteúdo do campo texto com a número de meses')

                    // se for tempo em Anos, então calcula número de meses
                    if(emAnos){
                        tempo = tempo * 12
                    }

                    if(element.includes(tempo + ' meses')){
                        console.log(testName + ' #Passo 8 - TESTE OK! Número de meses esperado de ' + element)
                    }
                })
            })
        })
    })
}

}