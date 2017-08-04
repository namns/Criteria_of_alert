<form action="{{ route('saveCriteria') }}" method="post">
    @if (count($errors) > 0)
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    code:<br>
    <input type="text" name="code"><br>
    title:<br>
    <input type="text" name="title"><br>
    formulas:<br>
    <input type="text" name="formulas"><br>
    status:<br>
    <select id="select" name="status" >
        <option value="0">Không hiệu lực</option>
        <option value="1">Hiệu lực</option>
    </select><br><br><br>
    <input type="hidden" value="{{ csrf_token() }}" name="_token">
    <button type="submit"> THÊM MỚI </button>
</form>