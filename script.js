document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '867692582808041f285b34ce17a59115';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-42.72&lon=-73.94&appid=' + apiKey;

    function obtenerClima() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const temperatura = data.list[0].main.temp;
                const descripcion = data.list[0].weather[0].description;

                document.getElementById('temperatura').textContent = `La temperatura es: ${(temperatura - 273.15).toFixed(2)} °C`;
                document.getElementById('descripcion').textContent = `Descripción del clima: ${descripcion}`;
            })
            .catch(error => {
                console.error('Error al obtener los datos del clima', error);
            });
    }

    obtenerClima(); // Llamar a la función al cargar la página

    // Evento para manejar el envío del formulario de postulación
    document.getElementById('voluntario').addEventListener('submit', function(event) {
        event.preventDefault();

        const rut = document.getElementById('rut').value;
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellidoPaterno').value;
        const apellidoMaterno = document.getElementById('apellidoMaterno').value;
        const edad = document.getElementById('edad').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        const errores = [];

        if (rut.length < 9 || rut.length > 10) {
            errores.push("El Rut debe tener entre 9 y 10 caracteres.");
        }
        if (nombre.length < 3 || nombre.length > 20) {
            errores.push("El nombre debe tener entre 3 y 20 caracteres.");
        }
        if (apellidoPaterno.length < 3 || apellidoPaterno.length > 30) {
            errores.push("El apellido paterno debe tener entre 3 y 30 caracteres.");
        }
        if (apellidoMaterno.length < 3 || apellidoMaterno.length > 30) {
            errores.push("El apellido materno debe tener entre 3 y 30 caracteres.");
        }
        if (edad < 18 || edad > 35) {
            errores.push("La edad debe estar entre 18 y 35 años.");
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errores.push("El correo electrónico no tiene una estructura válida.");
        }
        if (!/^[0-9]{9}$/.test(telefono)) {
            errores.push("El teléfono debe tener 9 dígitos.");
        }

        if (errores.length > 0) {
            alert(errores.join("\n"));
        } else {
            const cartaPostulacion = `
                <h3>Carta de Postulación</h3>
                <p><strong>RUT:</strong> ${rut}</p>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Apellido Paterno:</strong> ${apellidoPaterno}</p>
                <p><strong>Apellido Materno:</strong> ${apellidoMaterno}</p>
                <p><strong>Edad:</strong> ${edad}</p>
                <p><strong>Correo Electrónico:</strong> ${email}</p>
                <p><strong>Fono de Contacto:</strong> ${telefono}</p>
            `;
            document.getElementById('cartaPostulacion').innerHTML = cartaPostulacion;
        }
    });
});


