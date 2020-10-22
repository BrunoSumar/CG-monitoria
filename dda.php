<!DOCTYPE html>
<html lang="pt" dir="ltr">
    <head>
        <script src="./p5/p5.js"></script>
        <script src="./p5/p5.dom.min.js"></script>
        <script src="./p5/p5.sound.min.js"></script>
        <meta charset="utf-8">
        <title>Home - CG monitoria</title>
        <link rel="stylesheet" href="./css/base.css">
    </head>
    <body>

        <!-- Lateral -->
          <?php
            echo file_get_contents("./sidebar.html", false, NULL, 0, 70000) ;
         ?>
        <!-- Centro -->
        <div id="principal">
            <div id="conteudo">

                <!-- Breadcrumbs -->
                <div class="breadcrumbs">
                    <a class="path" href="./index.html">Home</a> /
                    <a class="path" href="./rasterizacao.html">Rasterização</a> /
                    <p class="path">DDA</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de retas - Algoritmo DDA</h2>
                    <p> O Digital Differential Analyser (DDA) é um algoritmo simples que nos permite escolher quais pixels da tela preencher (rasterizar) para representear uma reta graficamente.<br>
                    O algoritmo funciona da seguinte maneira: uma vez escolhidos os dois extremos do segmento de reta, determinamos em qual eixo os ponstos estão mais distantes. Calculamos a variação das coordenadas dos pontos da reta e percorremos esse eixo adicionando as variações ao ponto inicial até que o segmento de reta esteja totalmente preenchido.
                        Abaixo você pode conferir um pseudo-código desse algoritmo e um exemplo interativo de sua execução.</p>

                    <div class="codigo">
                        DDA()<br>
                        {<br>
                            //  Pontos extremos da reta<br>
                            var ponto1 = {x:x1, y:y1}, ponto2 = {x:x2, y:y2};<br>
                            //  Distância dos extremos nos eixos x e Y<br>
                            var dx = ponto2.x - ponto1.x, dy = ponto2.y - ponto1.y;<br>
                            //  Escolha da maior distância<br>
                            var delta = Max(dx, dy);<br>
                            //  Calculo da variaçao de x e y<br>
                            dx /= delta;<br>
                            dy /= delta;<br>
                            //  Loop percorrendo a maior distância<br>
                            var x = ponto1.x, y = ponto1.y;<br>
                            var listaDePontos = [];<br>
                            for(var i=0;i<=delta;i++){<br>
                                listaDePontos.push([x,y]);<br>
                                //  incremento da variação<br>
                                x = x + dx;<br>
                                y = y + dy;<br>
                            }<br>
                            return listaDePontos;<br>
                        };<br>
                    </div>
                    <!-- Canvas -->
                    <div id="dda" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaDDA" >
                    </div>
                    <!-- Controles do canvas -->
                    <div class="controles">
                        <h4 class="sliderTitulo">Progresso:</h4>
                        <div class="sliderHolder">
                            <input type="range" min="0" max="100" name="status" class="slider" id="sp" value="0">
                        </div>
                        <h4 class="sliderTitulo">Tamanho da malha:</h4>
                        <div class="sliderHolder">
                            <input type="range" min="1" max="60" name="malha" class="slider" id="sm" value="30">
                        </div>

                        <label  for="cm" class="checkTitulo"><h4>Exibir Malha:</h4></label>
                        <div class="checkHolder">
                            <input type="checkbox" name="exibirMalha" id="cm">
                        </div>
                        <label for="pa" class="checkTitulo"><h4>Progresso automático:</h4></label>
                        <div class="checkHolder" >
                            <input class="check" type="checkbox" name="pAuto" id="pa">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- javascript -->
        <script src="./js/base.js"></script>
        <script src="./js/retaDDA.js"></script>


    </body>
</html>
