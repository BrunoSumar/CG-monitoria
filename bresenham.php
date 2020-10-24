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
                    <p class="path">Bresenham</p>
                </div>
                <hr>
                <!-- separar conteudo em .blocos -->
                <div class="bloco">
                    <h2>Rasterização de retas - Algoritmo de Bresenham</h2>
                    <p>O algoritmo de rasterização de retas de Bresenham, assim como o <spam><a src ="dda.php">DDA</a></spam>, que a partir de duas posições no espaço gera um conjunto discreto de pontos entre essas posições (basicamente nos diz quais pixels pertecem a um segmento de reta). Esse algoritmo busca ser mais otimizado ao evitar operações com números de ponto flutuante e suas aroximações.<br>
                        Abaixo você pode conferir um pseudo-código desse algoritmo e um exemplo interativo de sua execução.</p>

                    <div class="codigo">
                        Bresenham(p1, p2)  //Algoritmo de Bresenham para primeiro octante<br>
                        {<br>
                            let dx = p2.x - p1; //variação em X<br>
                            let dy = p2.y - p1.y; //Varização em Y<br>
                        let D = 2*dy + dx;<br>
                        <br>
                        let y = p1.y;<br>
                        let listaDePontos = [];<br>
                        for(let x=p1.x;x!=p2.x;x++){<br>
                        listaDePontos.push([x,y]);<br>
                        if(D>0){<br>
                            D -= 2*dx;<br>
                            y++;<br>
                        }<br>
                        D += 2*dy;
                        }<br>
                            return listaDePontos;<br>
                        };<br>
                    </div>
                    <br>
                    <p> Clique e arraste os pontos para mudar sua posição</p>
                    <!-- Canvas -->
                    <div id="bresenham" class="canvasHolder wide tall">   </div>
                    <!-- output do canvas -->
                    <div class="dadosCanvas" id="saidaBresenham" >
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
        <script src="./js/bresenham.js"></script>


    </body>
</html>
