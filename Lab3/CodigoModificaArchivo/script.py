def process_word(word):
    if not word:
        return None  # Ignorar palabras vacías
    if word[0].isdigit():
        return None  # Ignorar palabras que comienzan con un número
    return word.capitalize() + '0'  # Capitalizar la primera letra y agregar un '0' al final

def process_file(input_file, output_file):
    count = 0  # Contador de contraseñas modificadas
    with open(input_file, 'r', encoding='latin-1', errors='ignore') as infile:
        lines = infile.readlines()
    
    with open(output_file, 'w', encoding='latin-1') as outfile:
        for line in lines:
            word = line.strip()
            processed_word = process_word(word)
            if processed_word:
                outfile.write(processed_word + '\n')
                count += 1  # Incrementar el contador
    
    print(f'Cantidad de contraseñas modificadas y guardadas: {count}')

if __name__ == '__main__':
    input_file = 'rockyou.txt'  # Ruta del archivo de entrada
    output_file = 'rockyou_mod.dic'  # Ruta del archivo de salida
    process_file(input_file, output_file)
