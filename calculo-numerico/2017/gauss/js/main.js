/**
 * Created by thomaz on 28/08/16.
 */

$(function(){

    var rows = 0;
    var cols = 0;

    $('#form_row_col').on('submit', function(){
        doMatriz(Number($('#numLinhas').val()));

        return false;
    });

    $('#bt_calcular').on('click', function(){
        
        var items = [
              [3, 3, 1, 7], // 0 
              [2, 2, -1, 3], // 1
              [1, -1, 5, 5] // 2
            ];

        // Obtem os valores
        var matriz = new Array(rows);
        for(var i = 0; i < rows; i++) {
            var mCol = new Array(cols);
            for(var j = 0; j < cols; j++) {
                // mCol[j] = Number($('#field_' + i + '_' + j).val());
                mCol[j] = items[i][j];
                
                $('#field_' + i + '_' + j).val(items[i][j]);
            }
            matriz[i] = mCol;
        }

        // Aplica gauss
        var m = 0;
        while( m < matriz.length ) {
            for(var i = m + 1; i < matriz.length; i++) { // linha
                console.log(matriz[i][m] + "/"+ matriz[m][m])
                
                var multiplicador = matriz[i][m] / matriz[m][m]; console.log(multiplicador);
                
                
                for(var j = 0; j < matriz[i].length-1; j++) { // coluna
                    var r = matriz[i][j] - (multiplicador * matriz[m][j]);

                    matriz[i][j] = r;
                    
                    // console.log(r);
                }
            }
            m++;
            
        }
        
        // console.log(m);
		
        
        
        
		
		/*
    	for(int i = n - 1; i != -1; i--){
            if (i == (n - 1)) {
                sltn[i] = (matrix[i][buffer - 1]) / matrix[i][i];
            } else {
                sltn[i] = (matrix[i][buffer - 1] - somatoria(i)) / matrix[i][i];
            }
        }			
		*/
        
		var n = matriz.length;
		var sltn = new Array(n);
    	for(var i = n - 1; i != -1; i--){
			if (i == (n - 1)) {
				sltn[i] = (matriz[i][cols - 1]) / matriz[i][i];
			} else {
		        
				var somatorio = 0;
				for(var j = i + 1; j != n; j++){
		           	somatorio += (matriz[i][j])*sltn[j];
		        }
				
				sltn[i] = (matriz[i][cols - 1] - somatorio) / matriz[i][i];
			}
		}
		
		$('#val1').text(Math.round(sltn[0]));
		$('#val2').text(Math.round(sltn[1]));
		$('#val3').text(Math.round(sltn[2]));
			

        // Escreve o resultado
        $('#wait_result').find('tbody').html('');
        for(var i = 0; i < matriz.length; i++) {
            var row = '<tr>';
            for(var j = 0; j < matriz[i].length; j++) {
                if( j + 1 == matriz[i].length ) {
                    row += '<td style="background: #000000;"><font color="white">' + Math.round(matriz[i][j]) + '</font></td>';
                } else {
                    row += '<td>' + Math.round(matriz[i][j]) + '</td>';
                }
            }
            row += '</tr>';

            $('#wait_result').find('tbody').append(row);
        }


    });

/*
	
    public double somatoria(int i){
        double somatoria = 0;
        for(int j = i + 1; j != n; j++){
                somatoria += (matrix[i][j])*sltn[j];
        }
        return somatoria;
    }
	
*/ 



    function doMatriz(ordem) {
        rows = ordem;
        cols = ordem + 1;

        $('#wait_matriz').find('tbody').html('');
        for(var i = 0; i < ordem; i++) {
            var row = '<tr>';
            var j = 0;
            for(; j < ordem; j++) {
                row += '<td style="background: #ccc">' +
                    '<input type="number" class="form-control" id="field_' + i + '_' + j + '">' +
                    '</td>';
            }
            row += '<td style="background: #000000">' +
                '<input type="number" class="form-control" placeholder="=" id="field_' + i + '_' + j + '">' +
                '</td></tr>';

            $('#wait_matriz').find('tbody').append(row);
        }
    }

});