
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>TIÊU CHÍ</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/html5reset-1.6.1.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/bootstrap-theme.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/admin/admin.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/admin/recruit.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/customer.css') }}">

</head>

<body>


<main>
    <div class="main-wrap">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="table-column">
                    <div class="title table-cell">DANH MỤC TIÊU CHÍ CẢNH BÁO</div>
                    <div class="btn-column table-cell">
                        <button class="btn btn-primary" id="add_new_btn" onclick="javascript:addcriteria()" >
                            <span class="glyphicon glyphicon-file" aria-hidden="true"> THÊM</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="csv-column">
                    <form action="{{route('search.criteria')}}" method="get" class="form-horizontal">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-block">
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <label style="width: 20%;" class="col-md-2 form-control-label" for="select">Mã tiêu chí</label>
                                            <input type="text" name="code" class="form-control" placeholder="Mã tiêu chí" style="width: 60%; margin-bottom: 20px;">
                                        </div>
                                        <div class="col-md-6">
                                            <label style="width: 20%;" class="col-md-2 form-control-label" for="select">Tên tiêu chí</label>
                                            <input type="text" name="title" class="form-control" placeholder="Tên tiêu chí" style="width: 60%;margin-bottom: 20px;">
                                        </div>
                                    </div>
                            </div>
                            <div class="card-block">
                                    <div class="form-group row">
                                        <label style="width: 10%;padding-left: 28px;" class="col-md-1 form-control-label" for="select">Trạng thái</label>
                                        <div class="col-md-10" style="width: 30%;padding-left: 5px;">
                                            <select id="select" name="status" class="form-control form-control-sm">
                                                <option value="0">Không hiệu lực</option>
                                                <option value="1">Hiệu lực</option>
                                            </select>
                                        </div>
                                    </div>
                            </div>
                            <div class="card-footer text-center" style="padding-top: 20px;padding-bottom: 20px;">
                                <button type="submit" class="btn btn-sm btn-primary"><i class="fa fa-search"></i> Tìm kiếm</button>
                                <button type="reset" class="btn btn-sm btn-success"><i class="fa fa-refresh"></i> Làm mới</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>

                <div class="list-column">
                    <form id="main_form" action="" method="post" >
                        @if (\Session::has('success'))
                            <p style="color: red;margin-left: 30px;font-size: 16px;font-weight: 500;margin-top: 10px;">{!! \Session::get('success') !!}</p>
                        @endif
                        <input type="hidden" value="deletes" name="action">
                        <div class="paging-column">
                            <div class="count col-md-6 form-inline">
                                <p> Tổng số <span class="total_recruit">{{$criteria->total()}}</span> bản ghi</p>
                            </div>

                        </div>
                        <table class="table table-bordered table-striped" id="recruit_list">
                            <tr>
                                <th class="id-column text-center" style="color:#337ab7;">STT</th>
                                <th class="id-column text-center" style="color:#337ab7;">ID</th>
                                <th class="title-column text-center" style="color:#337ab7;">MÃ TIÊU CHÍ</th>
                                <th class="title-column text-center" style="color:#337ab7;">TÊN TIÊU CHÍ</th>
                                <th class="category-column text-center" style="color:#337ab7;">CÔNG THỨC TÍNH</th>
                                <th class="category-column text-center" style="color:#337ab7;">TRẠNG THÁI</th>
                                <th class="checkbox-column text-center" style="color:#337ab7;">
                                    <button class="btn btn-danger" type="button" onclick="javascript:deletecriteria()" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> XÓA</button>
                                </th>
                            </tr>

                            @foreach($criteria as $key => $value)
                                <tr id="{{$value->id}}">
                                    <td class="text-center id"><?php echo $key+1;?></td>
                                    <td class="text-center id">{{$value->id}}</td>
                                    <td class="recruit-code">{{$value->code}}</td>
                                    <td class="title">{{$value->title}}</td>
                                    <td class="category-name">{{$value->formulas}}</td>
                                    <td class="text-center is-public"> @if($value->status == 0) <span style="border-radius:3px;background-color: red;padding: 5px;color: white;"> Không hiệu lực </span> @else <span style="border-radius:3px;background-color: #2ca02c;padding: 5px;color: white;"> hiệu lực </span> @endif</td>
                                    <td class=" text-center"><input id="checkbox_id" type="checkbox" name="check_list[]" value="{{$value->id}}"></td>
                                </tr>
                            @endforeach
                            <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
                        </table>
                        <div class="paging-column">
                            <div class="count col-md-6 form-inline">
                                <p> Tổng số <span class="total_recruit">{{$criteria->total()}}</span> bản ghi</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<footer>
    <small>&copy; content management system</small>
</footer>





<!-- dialog -->
{{--<div class="modal fade bs-example-modal" id="urlRefresh" tabindex="-1" role="dialog">--}}
{{--<div class="modal-dialog" role="document">--}}
{{--<div class="modal-content">--}}
{{--<div class="modal-header">--}}
{{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
{{--<h4 class="modal-title">求人情報URL一括更新</h4>--}}
{{--</div>--}}
{{--<div class="modal-body">--}}
{{--<p>チェックした求人情報のURLを一括更新します。よろしいですか？</p>--}}
{{--</div>--}}
{{--<div class="modal-footer">--}}
{{--<button type="button" class="btn btn-warning" onclick="javascript:updateListURL()">URL一括更新</button>--}}
{{--<button type="button" class="btn btn-default" data-dismiss="modal">キャンセル</button>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}



{{--<div class="modal fade bs-example-modal" id="checkDelete" tabindex="-1" role="dialog">--}}
{{--<div class="modal-dialog" role="document">--}}
{{--<div class="modal-content">--}}
{{--<div class="modal-header">--}}
{{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
{{--<h4 class="modal-title">求人一括削除</h4>--}}
{{--</div>--}}
{{--<div class="modal-body">--}}
{{--<p>チェックした求人を一括削除します。よろしいですか？</p>--}}
{{--</div>--}}
{{--<div class="modal-footer">--}}
{{--<button type="button" class="btn btn-danger" id="delete_recruit" >一括削除</button>--}}
{{--<button type="button" class="btn btn-default" data-dismiss="modal">キャンセル</button>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}




{{--<div class="modal fade bs-example-modal" id="delete" tabindex="-1" role="dialog">--}}
{{--<div class="modal-dialog" role="document">--}}
{{--<div class="modal-content">--}}
{{--<div class="modal-header">--}}
{{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
{{--<h4 class="modal-title">求人削除</h4>--}}
{{--</div>--}}
{{--<div class="modal-body">--}}
{{--<p>$求人タイトル$の求人を削除します。よろしいですか？</p>--}}
{{--</div>--}}
{{--<div class="modal-footer">--}}
{{--<button type="button" onclick="submitDelete()" class="btn btn-danger">削除</button>--}}
{{--<button type="button" class="btn btn-default" data-dismiss="modal">キャンセル</button>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--<div class="modal fade bs-example-modal" id="urlRefresh" tabindex="-1" role="dialog">--}}
{{--<div class="modal-dialog" role="document">--}}
{{--<div class="modal-content">--}}
{{--<div class="modal-header">--}}
{{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
{{--<h4 class="modal-title">URL更新</h4>--}}
{{--</div>--}}
{{--<div class="modal-body">--}}
{{--<p>$求人タイトル$のURLを更新します。よろしいですか？</p>--}}
{{--</div>--}}
{{--<div class="modal-footer">--}}
{{--<button type="button" class="btn btn-warning">URL更新</button>--}}
{{--<button type="button" class="btn btn-default" data-dismiss="modal">キャンセル</button>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}


</body>
<script src="{{ URL::asset('js/jquery.min.js') }}"></script>
<script src="{{ URL::asset('js/html5shiv-printshiv.min.js') }}"></script>
<script src="{{ URL::asset('js/respond.min.js') }}"></script>
<script src="{{ URL::asset('js/selectivizr.js') }}"></script>
<script src="{{ URL::asset('js/bootstrap.min.js') }}"></script>
<script src="{{ URL::asset('js/plugins/vuejs/vue.min.js') }}"></script>
<script src="{{ URL::asset('js/plugins/bootbox/bootbox.min.js') }}"></script>
<script src="{{ URL::asset('js/admin.js') }}"></script>
<script src="{{ URL::asset('js/site/client_common.js') }}" type="text/javascript"></script>
<script src="{{ URL::asset('js/admin/recruit.js') }}"></script>
<script src="{{ URL::asset('js/admin/recruit_list.js') }}"></script>

<script>
    $(function () {
        @if (count($errors) > 0)
        $('#new').modal('show');
        @endif
    });
</script>

</html>
