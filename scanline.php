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
                    <a class="path" href="./index.php">Home</a> /
                    <a class="path" href="./rasterizacao.php">Rasterização</a> /
                    <p class="path">Scanline</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de tirnagulos - Algoritmo scanline</h2>
                     <p> O algoritmo de rasterização de triangulo por scanline é um algoritmo eficiente que determina que pixels fazem parte de um triangulo, percorrendo esses pixels apenas uma vez cada.<br>
                         O algoritmo funciona da seguinte maneira: A partir do ponto mais alto (com maior Y) analisamos todas as linhas do triangulo. Encotramos os pontos mais a esquerda e mais a direita desta linha que fazem parte do triangulo, adicionamos todos os pontos entre eles a uma lista, e seguimos para a proxima linha (se houver). Quando não houver mais linhas a serem analisadas o algoritmo chega ao fim.
                        Abaixo você pode conferir um pseudo-código desse algoritmo e um exemplo interativo de sua execução.</p>

                     <div class="codigo">
                         scanline(p1,p2,p3)<br>
                         {<br>
                         var x = Math.min(p1[0],p2[0],p3[0]), mx = Math.max(p1[0],p2[0],p3[0]); // menor x maior x<br>
                         var y = Math.min(p1[1],p2[1],p3[1]), my = Math.max(p1[1],p2[1],p3[1]); // menor y maior y<br>
                         var listaPontos = [];<br>
                         for(var j=y;j<=my;j++)<br>
                        {<br>
                            var intervalo = calculaIntervalo(j, x, mx); //ponto mais a esquerda e mais a direita da linha<br>
                            for(var i=intervalo[0];i<=intervalo[1];i++)<br>
                            {<br>
                                listaPontos.push([i,j]);<br>
                            }<br>
                        }<br>
                        };<br>

                    </div>
                    <p>Clique nos vértices para alterar seus valores.</p>

                    <!-- Canvas -->
                    <div id="scanline" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaSL" >
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
        <script src="./js/scanline.js"></script>


    </body>
</html>
